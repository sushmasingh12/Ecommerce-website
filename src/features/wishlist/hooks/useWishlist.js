import { useSelector, useDispatch } from 'react-redux';
import { 
  addItem, 
  removeItem, 
  moveToBag,
  selectWishlistItems,
  selectWishlistItemsCount
} from '../store/wishlistSlice';
import { addItem as addToCart } from '../../cart/store/cartSlice';

export const useWishlist = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectWishlistItems);
  const count = useSelector(selectWishlistItemsCount);

  const handleAddItem = (product) => {
    dispatch(addItem(product));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleMoveToBag = (id) => {
    const item = items.find(i => i.id === id);
    if (item) {
      // Parse price — wishlist stores price as string like '€1,850'
      const numericPrice = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
      dispatch(addToCart({
        id: item.id,
        name: item.name,
        price: numericPrice,
        image: item.image,
        variant: item.color || 'Default',
        quantity: 1,
      }));
    }
    dispatch(moveToBag(id));
  };

  const isInWishlist = (id) => {
    return items.some(item => item.id === id);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      handleRemoveItem(product.id);
    } else {
      handleAddItem(product);
    }
  };

  return {
    items,
    count,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
    moveToBag: handleMoveToBag,
    isInWishlist,
    toggleWishlist
  };
};
