import { getProductById } from '../data/products';

const productService = {
  getProductById: async (id) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Get from centralized data source
    const product = getProductById(id);
    
    // Default to 'w1' for demo if not found (matching previous behavior)
    return product || getProductById('w1');
  }
};

export default productService;
