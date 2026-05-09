"use client";

import { useState } from "react";
import { detectCardType, CardType } from "../utils/cardUtils";
import { isExpiryValid } from "../utils/dateUtils";

export default function PaymentForm() {
  // 🌍 Currency
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  // 💳 Card Details
  const [cardType, setCardType] = useState<CardType>("unknown");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  // 💰 Payment
  const [amount, setAmount] = useState("");

  // 📊 UI State
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false); // ✅ FIXED

  // ===============================
  // FORMATTERS
  // ===============================

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    return cleaned;
  };

  // ===============================
  // VALIDATION
  // ===============================

  const validate = () => {
    const newErrors: any = {};

    if (cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.cardNumber = "Invalid card number";
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      newErrors.expiry = "Format must be MM/YY";
    } else if (!isExpiryValid(expiry)) {
      newErrors.expiry = "Card has expired";
    }

    if (cvv.length !== 3) {
      newErrors.cvv = "CVV must be 3 digits";
    }

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!amount || Number(amount) <= 0) {
      newErrors.amount = "Enter valid amount";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===============================
  // PAYMENT HANDLER (WITH TIMEOUT)
  // ===============================

  const generateTxnId = () =>
  "txn_" + Math.random().toString(36).substring(2, 10);

const handlePayment = async () => {
  if (!validate()) return;

  setLoading(true);

  const txnId = generateTxnId(); // 🔥 SAME ID FOR ALL RETRIES
  let attempt = 0;
  const maxRetries = 3;

  while (attempt < maxRetries) {
    attempt++;

    setStatus(`Processing... Attempt ${attempt}/${maxRetries}`);

    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 6000);

    try {
      const res = await fetch("/api/pay", {
        method: "POST",
        body: JSON.stringify({
          txnId,
          cardNumber,
          expiry,
          cvv,
          name,
          amount,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await res.json();

      // ✅ SUCCESS
      if (data.status === "success") {
        setStatus(`✅ Payment Successful (Txn: ${txnId})`);
        setLoading(false);
        return;
      }

      // ❌ FAILURE → RETRY
      if (data.status === "failed") {
        if (attempt === maxRetries) {
          setStatus(`❌ Failed after ${maxRetries} attempts`);
          setLoading(false);
          return;
        }
      }
    } catch (error: any) {
      // ⏳ TIMEOUT
      if (error.name === "AbortError") {
        if (attempt === maxRetries) {
          setStatus(`⏳ Timeout after ${maxRetries} attempts`);
          setLoading(false);
          return;
        }
      } else {
        setStatus("❌ Network Error");
        setLoading(false);
        return;
      }
    }
  }
};
  // ===============================
  // UI
  // ===============================

  return (
    <div>
      {/* CARD NUMBER */}
      <input
        placeholder="1234 5678 9012 3456"
        value={cardNumber}
        onChange={(e) => {
          const formatted = formatCardNumber(e.target.value);
          setCardNumber(formatted);
          setCardType(detectCardType(formatted));
        }}
        style={inputStyle}
      />

      {cardType !== "unknown" && (
        <p>Card Type: {cardType.toUpperCase()}</p>
      )}

      {errors.cardNumber && <p style={errorStyle}>{errors.cardNumber}</p>}

      {/* EXPIRY */}
      <input
        placeholder="MM/YY"
        value={expiry}
        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
        style={inputStyle}
      />
      {errors.expiry && <p style={errorStyle}>{errors.expiry}</p>}

      {/* CVV */}
      <input
        type="password"
        placeholder="CVV"
        maxLength={3}
        value={cvv}
        onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
        style={inputStyle}
      />
      {errors.cvv && <p style={errorStyle}>{errors.cvv}</p>}

      {/* NAME */}
      <input
        placeholder="Card Holder Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      />
      {errors.name && <p style={errorStyle}>{errors.name}</p>}

      {/* AMOUNT */}
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={inputStyle}
      />
      {errors.amount && <p style={errorStyle}>{errors.amount}</p>}

      {/* BUTTON */}
      <button onClick={handlePayment} style={buttonStyle} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {/* STATUS */}
      {status && <p style={{ marginTop: "1rem" }}>{status}</p>}
    </div>
  );
}

// ===============================
// STYLES
// ===============================

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "5px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const errorStyle = {
  color: "red",
  fontSize: "12px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "black",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};