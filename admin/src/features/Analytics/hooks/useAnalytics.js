import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalyticsData, setActiveRange } from "../store/analyticsSlice";

export const useAnalytics = () => {
  const dispatch = useDispatch();
  const { data, status, activeRange } = useSelector((state) => state.analytics);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAnalyticsData());
    }
  }, [dispatch, status]);

  const handleRangeChange = (range) => {
    dispatch(setActiveRange(range));
  };

  return { data, status, activeRange, handleRangeChange };
};
