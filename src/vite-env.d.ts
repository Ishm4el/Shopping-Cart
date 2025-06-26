/// <reference types="vite/client" />

interface Cart {
  [key: string]: {
    title: string;
    price: number;
    quantity: number;
    image: string;
  };
}

interface CartContext {
  cart: Cart;
  setCart: React.Dispatch<any>;
}

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

interface Products extends Array<Product> {}

interface ShopItemDialog {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  itemId: string;
  closeDialog: () => void;
}

interface ShopItemCard {
  product: Product;
  openDialog: () => void;
}
