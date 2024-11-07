// store/cartStore.js
import create from 'zustand';

const useCartStore = create((set) => ({
  cart: [],
  addToCart: (car) => set((state) => {
    const updatedCart = [...state.cart, car];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return { cart: updatedCart };
  }),
  removeFromCart: (index) => set((state) => {
    const updatedCart = state.cart.filter((_, i) => i !== index);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return { cart: updatedCart };
  }),
  clearCart: () => {
    localStorage.removeItem('cart');
    return { cart: [] };
  },
  loadCart: () => {
    const cartFromStorage = JSON.parse(localStorage.getItem('cart'));
    if (cartFromStorage) {
      set({ cart: cartFromStorage });
    }
  }
}));

export default useCartStore;
