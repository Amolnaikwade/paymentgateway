// components/CardPreview.tsx

type CardPreviewProps = {
  number: string;
  name: string;
  expiry: string;
};

export default function CardPreview({
  number,
  name,
  expiry,
}: CardPreviewProps) {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-xl">
      <p>{number || "**** **** **** ****"}</p>
      <div className="flex justify-between mt-4">
        <span>{name || "Card Holder"}</span>
        <span>{expiry || "MM/YY"}</span>
      </div>
    </div>
  );
}