import { useRef, useState, type EventHandler } from "react";

import "./pages.css";
import useFetchGet from "../components/useFetchGet";

function ShopItem({ product }: { product: Product }) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const openDialog = () => {
    if (dialogRef.current) dialogRef.current.showModal();
  };

  const closeDialog = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  return (
    <>
      <li
        className="card-product"
        key={product.id}
        tabIndex={0}
        onClick={openDialog}
        onKeyUp={(e) => {
          if (e.key === "Enter") openDialog();
        }}
        onKeyDown={(e) => {
          if (e.key === " ") openDialog();
        }}
      >
        <div className="product-image-container">
          <img
            className="product-image"
            src={product.image}
            alt={product.image}
          />
        </div>
        <p className="product-rating">
          Rating: {product.rating.rate} ({product.rating.count})
        </p>
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">Price: {product.price}</p>
        {/* <p className="product-description">{product.description}</p> */}
        {/* <p className="product-category">{product.category}</p> */}
      </li>
      <dialog
        ref={dialogRef}
        key={`dialog_${product.id}`}
        className="product-dialog"
      >
        <p>This is a dialog box.</p>
        <button
          autoFocus
          onClick={closeDialog}
          onKeyUp={(e) => {
            if (e.key === "Enter") closeDialog();
          }}
          onKeyDown={(e) => {
            e.preventDefault();
            if (e.key === " ") closeDialog();
          }}
        >
          Close
        </button>
      </dialog>
    </>
  );
}

function ShopList() {
  const [products, setProducts] = useState<null | Products>(null);
  const error = useFetchGet({ link: "/products", setter: setProducts });
  if (error) return <p>ERROR</p>;
  if (products !== null && Array.isArray(products))
    return (
      <ul className="list-product">
        {products.map((product: Product) => (
          <ShopItem product={product} />
        ))}
      </ul>
    );
  return <p>Loading</p>;
}

export default function Shop() {
  return (
    <section className="section">
      <h1 className="section-title">Shop</h1>
      <article className="article">
        <h2 className="article-title">Shop Items</h2>
        <ShopList />
      </article>
    </section>
  );
}
