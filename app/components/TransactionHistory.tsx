"use client";

import { useEffect, useState } from "react";
import { Transaction } from "../types/payment";

export default function TransactionHistory() {
  const [history, setHistory] = useState<Transaction[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("txns");
    if (data) setHistory(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("txns", JSON.stringify(history));
  }, [history]);

  return (
    <div className="mt-6">
      <h2 className="font-semibold">History</h2>

      {history.map((txn) => (
        <div
          key={txn.id}
          className="p-2 border rounded mt-2"
        >
          <p>ID: {txn.id}</p>
          <p>Status: {txn.status}</p>
          <p>Amount: {txn.amount}</p>
        </div>
      ))}
    </div>
  );
}