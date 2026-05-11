
import AIInsightChip from "../components/AIInsightChip";
import CampaignCards from "../components/CampaignCards";
import CartRecovery from "../components/CartRecovery";
import LoyaltyProgram from "../components/LoyaltyProgram";
import PerformanceSummary from "../components/PerformanceSummary";
import StorefrontBanners from "../components/StorefrontBanners";
import { usePromotions } from "../hooks/Usepromotions";
import VoucherTable from "../components/VoucherTable";

const PromotionsPage = () => {
  const { data, status, cartRecoveryEnabled, handleEnableCartRecovery } = usePromotions();

  if (status === "loading" || status === "idle") {
    return (
      <main className="pt-24 pb-12 px-12 min-h-screen">
        <div className="text-on-surface-variant text-sm">Loading promotions...</div>
      </main>
    );
  }

  return (
    <main className=" pt-24 pb-12 px-12 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-end mb-12">
        <div>
          
          <h2 className="text-2xl font-semibold tracking-tighter text-on-surface">
            Marketing &amp; Promotions
          </h2>
          <p className="text-on-secondary-container uppercase tracking-[0.15em] text-[10px] font-bold mb-1">
            Marketing Suite
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-surface-container-high text-on-surface font-semibold rounded-lg text-sm hover:bg-surface-container-highest transition-colors">
            Schedule Queue
          </button>
          <button
            className="px-6 py-2.5 bg-gradient-to-br from-primary to-primary-container text-on-primary font-semibold rounded-lg text-sm active:scale-95 transition-all"
            style={{ boxShadow: "0 4px 6px -1px rgba(25,28,29,0.04), 0 10px 15px -3px rgba(25,28,29,0.08)" }}
          >
            Create Campaign
          </button>
        </div>
      </div>

      {/* Performance Summary Bento */}
      <PerformanceSummary summary={data.summary} />

      {/* Middle Split Grid */}
      <div className="grid grid-cols-12 gap-8 mb-12">
        {/* Left: Campaigns + Vouchers */}
        <div className="col-span-12 lg:col-span-8">
          <CampaignCards campaigns={data.campaigns} />
          <VoucherTable vouchers={data.vouchers} />
        </div>

        {/* Right: Widgets */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <StorefrontBanners banners={data.banners} />
          <LoyaltyProgram loyalty={data.loyalty} />
          <CartRecovery
            cartRecovery={data.cartRecovery}
            enabled={cartRecoveryEnabled}
            onEnable={handleEnableCartRecovery}
          />
        </div>
      </div>

      {/* Floating AI Chip */}
      <AIInsightChip message={data.aiInsight} />
    </main>
  );
};

export default PromotionsPage;