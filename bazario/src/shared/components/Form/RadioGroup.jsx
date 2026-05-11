import React from "react";

const RadioGroup = ({ options, name, register, activeValue }) => {
  return (
    <div className="flex flex-wrap gap-4 pt-2">
      {options.map((option) => (
        <label key={option.value} className="cursor-pointer group">
          <input
            type="radio"
            value={option.value}
            {...register(name)}
            className="peer hidden"
          />
          <span className="block border border-outline-variant px-8 py-3 font-label text-[10px] font-bold uppercase tracking-widest transition-all duration-300 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-on-primary group-hover:border-primary/50">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
