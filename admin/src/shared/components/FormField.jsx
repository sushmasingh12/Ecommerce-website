import React from 'react'

const FormField = ({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  register,
  rules,
  error,
  rightElement,
}) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-on-surface"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full px-4 py-3 rounded-xl bg-surface-container-lowest border text-on-surface placeholder:text-outline/60 transition-all focus:outline-none focus:ring-2 focus:ring-primary/10 ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-outline-variant focus:border-primary"
          } ${rightElement ? "pr-12" : ""}`}
          {...register(name, rules)}
        />

        {rightElement ? (
          <div className="absolute inset-y-0 right-3 flex items-center">
            {rightElement}
          </div>
        ) : null}
      </div>

      {error ? <p className="text-sm text-red-600">{error.message}</p> : null}
    </div>
  );
}
export default FormField;
