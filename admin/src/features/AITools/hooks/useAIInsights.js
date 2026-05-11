import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAIInsights, setActiveTab } from "../store/aiInsightsSlice";

export const useAIInsights = () => {
  const dispatch = useDispatch();
  const { data, activeTab, status, error } = useSelector(
    (state) => state.aiInsights
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadAIInsights());
    }
  }, [dispatch, status]);

  const handleTabChange = (tab) => {
    dispatch(setActiveTab(tab));
  };

  return {
    data,
    activeTab,
    status,
    error,
    handleTabChange,
  };
};