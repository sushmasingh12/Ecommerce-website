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
      { name: 'Fine Leather Goods', path: '/accessories/leather' },
      { name: 'Timepieces', path: '/accessories/watches' },
      { name: 'Eyewear', path: '/accessories/eyewear' },
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
