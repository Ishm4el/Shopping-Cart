/// <reference types="vite/client" />

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
