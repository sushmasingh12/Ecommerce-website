import React, { forwardRef } from "react";

const Input = forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full border-b border-outline-variant bg-transparent py-4 font-body text-sm text-primary transition-all placeholder:text-outline-variant/40 focus:border-primary focus:outline-none ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
