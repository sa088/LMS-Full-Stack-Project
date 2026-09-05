const variants = {
  default: "bg-slate-100 text-slate-600",
  indigo: "bg-indigo-50 text-indigo-700",
  green: "bg-green-50 text-green-700",
  red: "bg-red-50 text-red-700",
};

export function Badge({ variant = "default", children }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
