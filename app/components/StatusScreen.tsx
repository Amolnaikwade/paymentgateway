import { PaymentStatus } from "../types/payment";

export default function StatusScreen({
  status,
}: {
  status: PaymentStatus;
}) {
  if (status === "processing") return <p>Processing...</p>;
  if (status === "success") return <p>Success ✅</p>;
  if (status === "failed") return <p>Failed ❌</p>;
  if (status === "timeout") return <p>Timeout ⏱️</p>;

  return null;
}