import { NextResponse } from "next/server";

// 🧠 Store processed transactions
const transactions = new Map();

export async function POST(req: Request) {
  const body = await req.json();
  const { txnId } = body;

  // 🔁 IDEMPOTENCY CHECK
  if (transactions.has(txnId)) {
    return NextResponse.json({
      status: "success",
      transactionId: txnId,
      message: "Duplicate request handled safely",
    });
  }

  const random = Math.random();

  // ⏳ Timeout
  if (random < 0.3) {
    await new Promise((res) => setTimeout(res, 8000));
    return NextResponse.json({ status: "timeout" });
  }

  // ❌ Failed
  if (random < 0.6) {
    return NextResponse.json({
      status: "failed",
      message: "Bank declined",
    });
  }

  // ✅ SUCCESS → SAVE TRANSACTION
  transactions.set(txnId, true);

  return NextResponse.json({
    status: "success",
    transactionId: txnId,
  });
}