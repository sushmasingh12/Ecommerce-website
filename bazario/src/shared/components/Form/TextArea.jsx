import React, { forwardRef } from "react";

const TextArea = forwardRef(({ className = "", ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`w-full resize-none border-b border-outline-variant bg-transparent py-4 font-body text-sm text-primary transition-all placeholder:text-outline-variant/40 focus:border-primary focus:outline-none ${className}`}
      {...props}
    />
  );
});

TextArea.displayName = "TextArea";

export default TextArea;
