import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardMetrics,
  fetchRevenueChart,
  fetchRecentOrders,
  fetchAIInsight, } from "../store/dashboardSlice";
import { selectMetrics,
  selectRevenueChart,
  selectRecentOrders,
  selectAIInsight,
  selectLoading,
  selectErrors, } from "../store/dashboardSelectors";

export const useDashboard = () =>{
  const dispatch = useDispatch();

  const metrics      = useSelector(selectMetrics);
  const revenueChart = useSelector(selectRevenueChart);
  const recentOrders = useSelector(selectRecentOrders);
  const aiInsight    = useSelector(selectAIInsight);
  const loading      = useSelector(selectLoading);
  const errors       = useSelector(selectErrors);

  useEffect(() => {
    dispatch(fetchDashboardMetrics());
    dispatch(fetchRevenueChart());
    dispatch(fetchRecentOrders());
    dispatch(fetchAIInsight());
  }, [dispatch]);

  return {
    metrics,
    revenueChart,
    recentOrders,
    aiInsight,
    loading,
    errors,
  };
}