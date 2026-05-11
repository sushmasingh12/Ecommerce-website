const RecommendationEngine = ({ recommendations }) => {
  if (!recommendations) return null;

  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-surface-container-lowest rounded-xl p-6 shadow-sm ring-1 ring-outline-variant/15">
      <h3 className="text-md font-bold text-on-surface tracking-tight mb-1">Recommendation Engine</h3>
      <p className="text-xs text-on-surface-variant mb-6">Conversion lift from AI personalization</p>
      <div className="space-y-6">
        {recommendations.map((item) => (
          <div key={item.label} className="relative pt-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-on-surface">{item.label}</span>
              <span className="text-xs font-bold text-primary">{item.lift}</span>
            </div>
            <div className="overflow-hidden h-2 text-xs flex rounded-full bg-surface-container-high">
              <div
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                style={{
                  width: item.width,
                  opacity: item.opacity === "100" ? 1 : 0.6,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationEngine;