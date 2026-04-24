import { getProductsByCategory, getAllProducts, categories } from '../data/products';

// Random shuffle helper
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

export const fetchCollectionData = async (category, subcategory = null) => {
  await new Promise(resolve => setTimeout(resolve, 800));

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
      'jewelry': ['Jewelry'],
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
