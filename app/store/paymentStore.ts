// store/paymentStore.ts

import { create } from "zustand";
import { PaymentStatus, Transaction } from "../types/payment";

interface State {
  status: PaymentStatus;
  attempts: number;
  transactionId: string | null;
  history: Transaction[];

  setStatus: (s: PaymentStatus) => void;
  setTransactionId: (id: string) => void;
  incrementAttempts: () => void;
  resetAttempts: () => void;
  addOrUpdateTransaction: (txn: Transaction) => void;
  loadHistory: () => void;
}

export const usePaymentStore = create<State>((set, get) => ({
  status: "idle",
  attempts: 0,
  transactionId: null,
  history: [],

  setStatus: (status) => set({ status }),

  setTransactionId: (id) => set({ transactionId: id }),

  incrementAttempts: () =>
    set((s) => ({ attempts: s.attempts + 1 })),

  resetAttempts: () => set({ attempts: 0 }),

  // Idempotency: update existing txn instead of duplicating
  addOrUpdateTransaction: (txn) => {
    const existing = get().history.find((t) => t.id === txn.id);

    let updated;
    if (existing) {
      updated = get().history.map((t) =>
        t.id === txn.id ? txn : t
      );
    } else {
      updated = [...get().history, txn];
    }

    localStorage.setItem("txns", JSON.stringify(updated));
    set({ history: updated });
  },

  loadHistory: () => {
    const data = localStorage.getItem("txns");
    if (data) set({ history: JSON.parse(data) });
  },
}));