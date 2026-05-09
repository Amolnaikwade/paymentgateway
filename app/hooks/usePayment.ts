// hooks/usePayment.ts

import { usePaymentStore } from "../store/paymentStore";
import { PaymentPayload } from "../types/payment";

export const usePayment = () => {
  const {
    setStatus,
    incrementAttempts,
    attempts,
    addOrUpdateTransaction,
  } = usePaymentStore();

  const pay = async (payload: PaymentPayload) => {
    setStatus("processing");

    const controller = new AbortController();

    // Abort after 6 sec (frontend timeout)
    const timeout = setTimeout(() => {
      controller.abort();
    }, 6000);

    try {
      const res = await fetch("/api/pay", {
        method: "POST",
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const data = await res.json();

      const status = data.status;

      setStatus(status);

      addOrUpdateTransaction({
        id: payload.transactionId,
        amount: payload.amount,
        status,
        timestamp: Date.now(),
        attempts: attempts + 1,
        reason: data.reason,
      });
    } catch {
      // Network / Abort timeout
      setStatus("timeout");

      addOrUpdateTransaction({
        id: payload.transactionId,
        amount: payload.amount,
        status: "timeout",
        timestamp: Date.now(),
        attempts: attempts + 1,
      });
    }

    incrementAttempts();
  };

  return { pay };
};