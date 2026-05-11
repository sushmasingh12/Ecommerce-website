import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProduct, setLoading, setError } from '../store/productsSlice';
import productService from '../services/productService';

const useProductDetail = (productId) => {
  const dispatch = useDispatch();
  const { selectedProduct, isLoading, error } = useSelector((state) => state.products);
  
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      
      dispatch(setLoading(true));
      try {
        const product = await productService.getProductById(productId);
        dispatch(setSelectedProduct(product));
        
        // Set defaults
        if (product) {
          setSelectedColor(product.colors[0]);
          setSelectedSize(product.aiRecommendation.size);
        }
      } catch (err) {
        dispatch(setError(err.message || 'Failed to fetch product'));
      }
    };

    fetchProduct();
  }, [productId, dispatch]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  return {
    product: selectedProduct,
    isLoading,
    error,
    selectedColor,
    selectedSize,
    handleColorChange,
    handleSizeChange,
  };
};

export default useProductDetail;
