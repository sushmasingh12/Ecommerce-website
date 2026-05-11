import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSettingsData, saveSettingsData } from "../services/settingsService";


export const loadSettings = createAsyncThunk(
  "settings/loadSettings",
  async () => {
    const data = await fetchSettingsData();
    return data;
  }
);

export const saveSettings = createAsyncThunk(
  "settings/saveSettings",
  async (_, { getState }) => {
    const { settings } = getState();
    const result = await saveSettingsData(settings);
    return result;
  }
);

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    storeProfile: { storeName: "", supportEmail: "" },
    notifications: [],
    security: { loginHistory: [] },
    team: { memberCount: 0, members: [] },
    shipping: {
      smartTaxEnabled: false,
      activeZones: [],
      currencies: [],
      selectedCurrency: "",
    },
    activeSection: "store-profile",
    saveStatus: "idle", // idle | saving | saved
    status: "idle",
    error: null,
  },
  reducers: {
    setActiveSection(state, action) {
      state.activeSection = action.payload;
    },
    updateStoreName(state, action) {
      state.storeProfile.storeName = action.payload;
    },
    updateSupportEmail(state, action) {
      state.storeProfile.supportEmail = action.payload;
    },
    toggleNotification(state, action) {
      const item = state.notifications.find((n) => n.id === action.payload);
      if (item) item.enabled = !item.enabled;
    },
    toggleSmartTax(state) {
      state.shipping.smartTaxEnabled = !state.shipping.smartTaxEnabled;
    },
    setSelectedCurrency(state, action) {
      state.shipping.selectedCurrency = action.payload;
    },
    resetSaveStatus(state) {
      state.saveStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSettings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadSettings.fulfilled, (state, action) => {
        state.status = "succeeded";
        const d = action.payload;
        state.storeProfile = d.storeProfile;
        state.notifications = d.notifications;
        state.security = d.security;
        state.team = d.team;
        state.shipping = d.shipping;
      })
      .addCase(loadSettings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(saveSettings.pending, (state) => {
        state.saveStatus = "saving";
      })
      .addCase(saveSettings.fulfilled, (state) => {
        state.saveStatus = "saved";
      });
  },
});

export const {
  setActiveSection,
  updateStoreName,
  updateSupportEmail,
  toggleNotification,
  toggleSmartTax,
  setSelectedCurrency,
  resetSaveStatus,
} = settingsSlice.actions;

export default settingsSlice.reducer;