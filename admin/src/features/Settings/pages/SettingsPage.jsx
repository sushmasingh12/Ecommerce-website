import NotificationsSection from "../components/NotificationsSection";
import SecuritySection from "../components/SecuritySection";
import SettingsNav from "../components/SettingsNav";
import ShippingSection from "../components/ShippingSection";
import StoreProfileSection from "../components/StoreProfileSection";
import TeamSection from "../components/TeamSection";
import { useSettings } from "../hooks/useSettings";


const SettingsPage = () => {
  const {
    storeProfile,
    notifications,
    security,
    team,
    shipping,
    activeSection,
    status,
    saveStatus,
    handleSectionChange,
    handleStoreNameChange,
    handleEmailChange,
    handleToggleNotification,
    handleToggleSmartTax,
    handleCurrencyChange,
    handleSave,
  } = useSettings();

  if (status === "loading" || status === "idle") {
    return (
      <main className="pt-24 pb-16 px-12 min-h-screen">
        <div className="text-on-surface-variant text-sm">Loading settings...</div>
      </main>
    );
  }

  const saveLabel =
    saveStatus === "saving"
      ? "Saving..."
      : saveStatus === "saved"
      ? "Saved ✓"
      : "Save Changes";

  return (
    <main className=" pt-24 pb-16 px-12 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter text-on-surface mb-2">
            Store Settings
          </h1>
          <p className="text-on-surface-variant max-w-xl">
            Configure your enterprise storefront parameters, manage global notification
            preferences, and define security protocols.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-surface-container-high text-on-surface font-semibold rounded-xl hover:bg-surface-container-highest transition-colors text-sm">
            Discard
          </button>
          <button
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className="px-6 py-2.5 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm disabled:opacity-70"
          >
            {saveLabel}
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-12 gap-8">
        <SettingsNav
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />

        <div className="col-span-9 space-y-12">
          <StoreProfileSection
            storeProfile={storeProfile}
            onNameChange={handleStoreNameChange}
            onEmailChange={handleEmailChange}
          />
          <NotificationsSection
            notifications={notifications}
            onToggle={handleToggleNotification}
          />
          <SecuritySection security={security} />
          <TeamSection team={team} />
          <ShippingSection
            shipping={shipping}
            onToggleSmartTax={handleToggleSmartTax}
            onCurrencyChange={handleCurrencyChange}
          />
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;