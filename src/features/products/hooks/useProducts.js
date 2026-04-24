import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCollection, setLoading, setError } from '../store/productsSlice';
import { fetchCollectionData } from '../services/productsService';

export const useProducts = (category, subcategory) => {
  const dispatch = useDispatch();
  const { currentCollection, isLoading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (!category) return;

    const loadCollection = async () => {
      try {
        dispatch(setLoading(true));
        const data = await fetchCollectionData(category, subcategory);
        dispatch(setCollection(data));
      } catch (err) {
        dispatch(setError(err.message || 'Failed to load collection'));
      }
    };

    loadCollection();
  }, [dispatch, category, subcategory]);

  return {
    collection: currentCollection,
    isLoading,
    error,
  };
};
