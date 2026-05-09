type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
};

export default function CardInput({
  label,
  value,
  onChange,
  error,
}: Props) {
  return (
    <div className="mb-3">
      <label className="block text-sm">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input w-full"
      />
      {error && (
        <p className="text-red-500 text-xs">{error}</p>
      )}
    </div>
  );
}