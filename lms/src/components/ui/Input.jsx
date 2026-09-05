import { forwardRef } from "react";

// forwardRef matters here: react-hook-form's register() needs to attach
// a ref directly to the underlying <input>, so this component must forward it.
export const Input = forwardRef(function Input(
  { label, error, id, ...props },
  ref,
) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        className={`mt-1.5 block w-full rounded-lg border px-4 py-2.5 text-sm shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-500/20"
            : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20"
        }`}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
});
