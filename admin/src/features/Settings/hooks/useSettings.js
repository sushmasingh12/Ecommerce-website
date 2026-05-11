// src/features/Settings/hooks/useSettings.js

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSettings,
  saveSettings,
  setActiveSection,
  updateStoreName,
  updateSupportEmail,
  toggleNotification,
  toggleSmartTax,
  setSelectedCurrency,
  resetSaveStatus, } from "../store/settingsSlice";


export const useSettings = () => {
  const dispatch = useDispatch();
  const state = useSelector((s) => s.settings);

  useEffect(() => {
    if (state.status === "idle") {
      dispatch(loadSettings());
    }
  }, [dispatch, state.status]);

  // Auto-reset "saved" label after 2s
  useEffect(() => {
    if (state.saveStatus === "saved") {
      const t = setTimeout(() => dispatch(resetSaveStatus()), 2000);
      return () => clearTimeout(t);
    }
  }, [state.saveStatus, dispatch]);

  return {
    ...state,
    handleSectionChange: (id) => dispatch(setActiveSection(id)),
    handleStoreNameChange: (val) => dispatch(updateStoreName(val)),
    handleEmailChange: (val) => dispatch(updateSupportEmail(val)),
    handleToggleNotification: (id) => dispatch(toggleNotification(id)),
    handleToggleSmartTax: () => dispatch(toggleSmartTax()),
    handleCurrencyChange: (val) => dispatch(setSelectedCurrency(val)),
    handleSave: () => dispatch(saveSettings()),
  };
};