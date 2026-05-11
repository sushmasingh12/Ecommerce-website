const STRENGTH_COLORS = {
  1: 'bg-error',
  2: 'bg-tertiary-light',
  3: 'bg-primary',
  4: 'bg-primary',
}

export default function PasswordStrengthBar({ strength, label }) {
  const color = STRENGTH_COLORS[strength] ?? 'bg-surface-container-high'

  return (
    <div className="mt-3">
      <div className="flex gap-1.5 h-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`flex-1 rounded-full transition-colors duration-300 ${
              level <= strength ? color : 'bg-surface-container-high'
            }`}
          />
        ))}
      </div>
      {strength > 0 && (
        <p className="text-[11px] text-on-surface-variant mt-2 flex items-center gap-1">
          <span
            className="material-symbols-outlined text-xs text-primary"
            style={{ fontVariationSettings: "'FILL' 1", fontSize: '12px' }}
          >
            info
          </span>
          Strength: {label}. Use 8+ characters with mixed case and numbers.
        </p>
      )}
    </div>
  )
}