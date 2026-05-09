# 💳 Payment Gateway UI (Next.js)

A simulated payment gateway built using Next.js (App Router) and TypeScript.  
This project demonstrates real-world payment flow handling including validation, retries, timeouts, and idempotency — without using any third-party payment SDK.

---

## 🚀 Features

### 💳 Card Handling
- Card number formatting (**** **** **** ****)
- Card type detection (Visa, Mastercard, Amex)
- Expiry auto-format (MM/YY)
- Expiry date validation (no past dates)
- CVV validation

### ⚙️ Payment Flow
- Simulated backend payment API
- Success / Failure / Timeout scenarios
- Retry logic (max 3 attempts)
- Timeout handling using AbortController
- Loading state handling

### 🔐 Advanced Concepts
- Idempotency using transaction IDs (prevents duplicate charges)
- Safe retry mechanism
- Edge case handling (network failure, timeout)

---

## 🛠 Tech Stack

- Next.js (App Router)
- TypeScript
- React (Hooks)
- Fetch API
- AbortController

---

## 📦 Setup Instructions

### 1️⃣ Clone the repository

git clone https://github.com/Amolnaikwade/paymentgateway.git
cd payment-gateway-ui

---

### 2️⃣ Install dependencies

npm install

---

### 3️⃣ Run development server

npm run dev

---

### 4️⃣ Open in browser

http://localhost:3000

---

## 🧪 Testing Scenarios

Try multiple times to observe:

- ✅ Successful payment
- ❌ Failed payment (Insufficient funds)
- ⏳ Timeout (after delay)
- 🔁 Automatic retry (up to 3 attempts)

---

## ⚠️ Assumptions

- Card number must be 16 digits (simplified, no Luhn check)
- CVV is fixed at 3 digits
- Backend is simulated (no real payment processing)
- Transaction state is stored in-memory (resets on server restart)
- No authentication or user session handling

---

## 🔮 Improvements (Given More Time)

### 💡 Functional Improvements
- Implement Luhn algorithm for real card validation
- Support different CVV lengths (e.g., Amex = 4 digits)
- Add real backend/database for transaction persistence
- Add webhook simulation for async payment updates

### 🎨 UI/UX Improvements
- Add credit card preview UI (live visual card)
- Improve styling (Tailwind / CSS modules)
- Add animations and loading indicators
- Mobile responsiveness

### 🔐 Security Enhancements
- Mask card details securely
- Add input sanitization
- Use HTTPS-only APIs
- Tokenization instead of raw card handling

### 📊 Monitoring
- Add logging for transactions
- Add analytics/dashboard for payment attempts

---

## 🌐 Live Demo

https://your-vercel-app.vercel.app

---

## 👨‍💻 Author

Your Name

---

## 🏁 Summary

This project simulates a real-world payment gateway UI by handling:
- Edge cases (timeouts, failures)
- Retry logic
- Idempotency
- User input validation

It demonstrates strong frontend engineering fundamentals and understanding of payment systems.