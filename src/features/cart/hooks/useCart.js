import { useSelector, useDispatch } from 'react-redux';
import { 
  addItem, 
  removeItem, 
  updateQuantity, 
  toggleDrawer, 
  setDrawerOpen, 
  clearCart,
  selectCartItems,
  selectIsDrawerOpen,
  selectCartTotal,
  selectCartCount
} from '../store/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const isOpen = useSelector(selectIsDrawerOpen);
  const total = useSelector(selectCartTotal);
  const count = useSelector(selectCartCount);

  const handleAddItem = (product) => {
    dispatch(addItem(product));
  };

  const handleRemoveItem = (id, variant) => {
    dispatch(removeItem({ id, variant }));
  };

  const handleUpdateQuantity = (id, variant, quantity) => {
    dispatch(updateQuantity({ id, variant, quantity }));
  };

  const handleToggleDrawer = () => {
    dispatch(toggleDrawer());
  };

  const handleCloseDrawer = () => {
    dispatch(setDrawerOpen(false));
  };

  const handleOpenDrawer = () => {
    dispatch(setDrawerOpen(true));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return {
    items,
    isOpen,
    total,
    count,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
    updateQuantity: handleUpdateQuantity,
    toggleDrawer: handleToggleDrawer,
    closeDrawer: handleCloseDrawer,
    openDrawer: handleOpenDrawer,
    clearCart: handleClearCart,
  };
};
