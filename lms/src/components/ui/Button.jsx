const variants = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700",
  secondary:
    "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50",
  danger: "bg-red-600 text-white hover:bg-red-700",
  ghost: "text-slate-600 hover:bg-slate-100",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  className = "",
  ...props
}) {
  return (
    <button
      className={`rounded-lg font-semibold transition ${variants[variant]} ${sizes[size]} ${
        isLoading ? "cursor-not-allowed opacity-60" : ""
      } ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? "Loading…" : children}
    </button>
  );
}
