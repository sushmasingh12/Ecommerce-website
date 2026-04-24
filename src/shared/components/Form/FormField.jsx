import React from "react";

const FormField = ({ label, error, children, className = "" }) => {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {label && (
        <label className="font-label text-[10px] font-bold uppercase tracking-widest text-primary/60">
          {label}
        </label>
      )}
      {children}
      {error && (
        <span className="text-[10px] font-medium uppercase tracking-wider text-error">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default FormField;
