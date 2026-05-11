// src/features/Reviews/components/StarRating.jsx

const StarRating = ({ rating, max = 5 }) => (
  <div className="flex text-amber-400">
    {Array.from({ length: max }, (_, i) => (
      <span
        key={i}
        className="material-symbols-outlined text-lg"
        style={i < rating ? { fontVariationSettings: "'FILL' 1" } : {}}
      >
        star
      </span>
    ))}
  </div>
);

export default StarRating;