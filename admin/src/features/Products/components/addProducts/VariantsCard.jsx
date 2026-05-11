import { useState } from "react";

const VariantGroup = ({ label, items, onRemove, onAdd, placeholder })=> {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input.trim());
      setInput("");
    }
  };

  return (
    <div className="p-4 rounded-xl border border-outline-variant/15 bg-surface-container-low/40">
      <p className="text-xs font-bold uppercase tracking-widest text-on-secondary-container mb-4">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-sm text-sm text-on-surface border border-outline-variant/10"
          >
            {item}
            <button
              onClick={() => onRemove(item)}
              className="material-symbols-outlined text-sm text-outline hover:text-error transition-colors"
            >
              close
            </button>
          </span>
        ))}
        <div className="inline-flex items-center gap-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder={placeholder}
            className="px-3 py-1.5 border border-dashed border-primary/30 rounded-full text-sm text-primary placeholder:text-primary/50 bg-transparent focus:outline-none focus:bg-primary/5 w-28 transition-all"
          />
          <button
            onClick={handleAdd}
            className="w-7 h-7 rounded-full border border-dashed border-primary/30 flex items-center justify-center text-primary hover:bg-primary/5 transition-colors"
          >
            <span className="material-symbols-outlined text-xs">add</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const VariantsCard =({ form, onAddColor, onRemoveColor, onAddSize, onRemoveSize }) => {
  return (
    <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">layers</span>
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-on-surface">Variants</h2>
        </div>
        <button className="text-xs font-bold uppercase tracking-widest text-primary hover:underline">
          Manage All
        </button>
      </div>

      <div className="space-y-4">
        <VariantGroup
          label="Color Options"
          items={form.colors}
          onAdd={onAddColor}
          onRemove={onRemoveColor}
          placeholder="Add color..."
        />
        <VariantGroup
          label="Storage Size"
          items={form.sizes}
          onAdd={onAddSize}
          onRemove={onRemoveSize}
          placeholder="Add size..."
        />
      </div>
    </section>
  );
}
export default VariantsCard