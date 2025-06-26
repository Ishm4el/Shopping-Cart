import { createContext, useContext } from "react";

export const ShoppingCartContext = createContext<CartContext | null>(null);

export default function useShoppingCartContext() {
  const shoppingContext = useContext(ShoppingCartContext);
  if (!shoppingContext) {
    throw new Error("UseShoppingContext has to be used within <");
  }
  return shoppingContext;
}
