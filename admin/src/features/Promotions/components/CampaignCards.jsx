// src/features/Promotions/components/CampaignCards.jsx

const CampaignCards = ({ campaigns }) => {
  if (!campaigns) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-bold tracking-tight">Active Discount Campaigns</h4>
        <button className="text-primary text-sm font-semibold hover:underline">View All</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-surface-container-lowest rounded-xl p-5 hover:border-primary/30 transition-all group"
            style={{ border: "1px solid rgba(196, 197, 217, 0.15)" }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-surface-container-high overflow-hidden flex-shrink-0">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-bold text-sm">{campaign.title}</h5>
                <p className="text-xs text-on-surface-variant">{campaign.category}</p>
              </div>
              <div className="flex flex-col items-end flex-shrink-0">
                <span className="text-xs font-bold text-primary">{campaign.discount}</span>
                <span className="text-[10px] text-slate-400">{campaign.endsIn}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-on-secondary-container">
                <span>Goal: {campaign.goal}</span>
                <span>
                  {campaign.achieved} ({campaign.progress}%)
                </span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000"
                  style={{ width: `${campaign.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignCards;