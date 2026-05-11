export const NAV_DATA = [
  {
    name: 'Collections',
    path: '/collections',
  },
  {
    name: 'Men',
    path: '/men',
    icon: 'male',
    subcategories: [
      { name: 'Shirts', path: '/men/shirts' },
      { name: 'T-shirts', path: '/men/t-shirt' },
      { name: 'Pant & Joggers', path: '/men/joggers' },
      { name: 'Trouser', path: '/men/trousers' },
    ],
  },
  {
    name: 'Women',
    path: '/women',
    icon: 'female',
    subcategories: [
      { name: 'Dresses & Skirts', path: '/women/dresses' },
      { name: 'Top', path: '/women/tops' },
      { name: 'T-Shirt', path: '/women/t-shirts' },
      { name: 'Bottomwear', path: '/women/bottomwear' },
    ],
  },

  {
    name: 'Accessories',
    path: '/accessories',
    icon: 'diamond',
    subcategories: [
      { name: 'Bags', path: '/accessories/bags' },
      { name: 'watches', path: '/accessories/watches' },
      { name: 'Jewellery', path: '/accessories/Jewellery' },
    ],
  },
  {
    name: 'Footwear',
    path: '/footwear',
    icon: 'steps',
    subcategories: [
      { name: 'Men', path: '/footwear/men' },
      { name: 'Women', path: '/footwear/women' },
    ],
  },
  {
    name: 'New Arrivals',
    path: '/new-arrivals',
  },

];
