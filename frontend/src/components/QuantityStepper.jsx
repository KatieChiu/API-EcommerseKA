export default function QuantityStepper({ value, onChange, min = 1 }) {
  return (
    <div className="inline-flex items-center border border-sage rounded-sm">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-9 h-9 flex items-center justify-center hover:bg-sage/50 transition-colors"
        aria-label="Disminuir cantidad"
      >
        −
      </button>
      <span className="w-10 text-center font-medium">{value}</span>
      <button
        onClick={() => onChange(value + 1)}
        className="w-9 h-9 flex items-center justify-center hover:bg-sage/50 transition-colors"
        aria-label="Aumentar cantidad"
      >
        +
      </button>
    </div>
  );
}