import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setProducts, setCategories, setError } from '../store/dashboardSlice';
import { fetchDashboardData } from '../services/dashboardService';

export const useDashboard = () => {
  const dispatch = useDispatch();
  const { products, categories, isLoading, error } = useSelector((state) => state.home);

  useEffect(() => {
    const loadData = async () => {
      try {
        dispatch(setLoading(true));
        const data = await fetchDashboardData();
        dispatch(setProducts(data.products));
        dispatch(setCategories(data.categories));
      } catch (err) {
        dispatch(setError(err.message || 'Failed to load home data'));
      }
    };

    if (products.length === 0) {
      loadData();
    }
  }, [dispatch, products.length]);

  return {
    products,
    categories,
    isLoading,
    error,
  };
};
