import { getNewArrivals, getCategories } from '../../products/data/products';

export const fetchDashboardData = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    products: getNewArrivals(),
    categories: getCategories(),
  };
};
