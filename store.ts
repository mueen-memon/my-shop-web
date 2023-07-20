import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartState = {
  isOpen: boolean;
  cart: AddCartType[];
  toggleCart: () => void;
  clearCart: () => void;
  addProduct: (item: AddCartType) => void;
  removeProduct: (item: AddCartType) => void;
  paymentIntent: string;
  onCheckout: string;
  setPaymentIntent: (paymentIntent: string ) => void;
  setCheckout: (val: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      paymentIntent: "",
      onCheckout: "cart",
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addProduct: (item) =>
        set((state) => {
          console.log("item: ", item);
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );
          console.log("exist: ", existingItem);
          if (existingItem) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return {
                  ...cartItem,
                  quantity: cartItem.quantity! + 1,
                };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }
        }),
      removeProduct: (item) => set((state) => {
        const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
        if(existingItem && existingItem.quantity! > 1){
          const updatedCart = state.cart.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity! - 1,
              };
            }
            return cartItem;
           })
           return {cart: updatedCart}
        }
        else{
          const filteredCart = state.cart.filter((cartItem) => cartItem.id !== item.id)
          return {cart: filteredCart}
        }
      }),
      setPaymentIntent: (val) => set((state) => ({paymentIntent: val})), 
      setCheckout: (val) => set((state) => ({onCheckout: val})),
      clearCart: () => set((state) => ({cart: []})),
    }),
    { name: "cart-store" }
  )
);

type ThemeState = {
  mode: 'light' | 'dark',
  toggleMode: (theme: 'light' | 'dark') => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'light',
      toggleMode: (theme) => set((state) => ({ mode: theme}))
    }),
    {name: 'theme-store'}
  )
)
