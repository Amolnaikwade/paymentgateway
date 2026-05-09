"use client";

import PaymentForm from "./components/PaymentForm";

/**
 * Home Page - Entry point of Payment Gateway UI
 * This page renders the main payment form
 */
export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {/* Page Title */}
        <h1
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          💳 Payment Gateway
        </h1>

        {/* Payment Form Component */}
        <PaymentForm />
      </div>
    </main>
  );
}