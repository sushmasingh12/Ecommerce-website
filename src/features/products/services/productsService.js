import { getProductsByCategory, getAllProducts, categories } from '../data/products';

// Random shuffle helper
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

export const fetchCollectionData = async (category, subcategory = null, search = null) => {
  await new Promise(resolve => setTimeout(resolve, 800));

  // ── Search route ──
  if (category === 'search' && search) {
    const allProducts = getAllProducts();
    const results = allProducts.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.subCategory?.toLowerCase().includes(search.toLowerCase()) ||
      p.subdesc?.toLowerCase().includes(search.toLowerCase())
    );
    return {
      category: `Search Results: ${search}`,
      description: results.length > 0 
        ? `We found ${results.length} products matching your search.`
        : `No products found for "${search}". Try checking your spelling or using more general terms.`,
      products: results,
    };
  }

  // ── Special routes: mix of all categories ──
  if (category === 'collections' || category === 'new-arrivals' || category === 'exclusive') {
    const allProducts = getAllProducts().filter(p => p.inStock);
    const mixed = shuffle(allProducts);
    return {
      category: category === 'new-arrivals' ? 'New Arrivals' : category === 'exclusive' ? 'Limited Edition' : 'All Collections',
      description: 'A curated mix of our finest pieces across every category.',
      products: mixed,
    };
  }

  // ── Regular category routes ──
  const categoryData = categories.find(c => c.slug === category.toLowerCase());
  if (!categoryData) throw new Error(`Category ${category} not found`);

  let products = getProductsByCategory(category);

  if (subcategory) {
    const subMapping = {
      'shirts': ['Shirts'],
      'blazers': ['Jackets'],
      'knitwear': ['Knitwear'],
      'trousers': ['Trousers'],
      'pants': ['Trousers'],
      'dresses': ['Dresses'],
      'tops': ['Tops'],
      'tshirts': ['Tshirts'],
      't-shirt': ['Tshirts'],
      't-shirts': ['Tshirts'],
      'joggers': ['Joggers'],
      'bottomwear': ['Bottomwear'],
      'bags': ['Bags'],
      'jewellery': ['jewellery'],
      'watches': ['Watches'],
      'belts': ['Belts'],
      'footwear': ['Footwear'],
    };
    const targetSubNames = subMapping[subcategory.toLowerCase()] || [subcategory.toLowerCase()];
    products = products.filter(p =>
      targetSubNames.some(name => p.subCategory?.toLowerCase() === name.toLowerCase())
    );
  }

  return {
    category: categoryData.name,
    subcategoryName: subcategory,
    description: categoryData.description,
    products,
  };
};
