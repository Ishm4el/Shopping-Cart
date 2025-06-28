import { useRef, useState } from "react";
import "./pages.css";
import "./ShopDialog.css";
import useFetchGet from "../components/useFetchGet";
import useShoppingCartContext from "../components/useShoppingCartContext";

const CURRENCY: string = "$";

function ShopItemCard({ product, openDialog }: ShopItemCard) {
  return (
    <li
      className="card-product"
      key={product.id}
      tabIndex={0}
      onClick={openDialog}
      onFocusCapture={(e) => e.preventDefault()}
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
        Rating: {product.rating.rate}/5 ({product.rating.count})
      </p>
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">
        Price: {CURRENCY}
        {product.price}
      </p>
    </li>
  );
}

function ShopItemDialog({ dialogRef, itemId, closeDialog }: ShopItemDialog) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  // Fetching from the api for demonstration purposes, otherwise,
  // it would be more effecient to use the data we've already fetched.
  useFetchGet({ link: `products/${itemId}`, setter: setProduct });
  const { setCart } = useShoppingCartContext();
  return (
    <dialog
      ref={dialogRef}
      key={`dialog_${itemId}`}
      className="product-dialog"
      tabIndex={-1}
      onClick={() => closeDialog()}
    >
      {product === null ? (
        <>Loading</>
      ) : (
        <div
          className="product-dialog-content-container"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            className="product-dialog-image"
            src={product.image}
            alt={product.image}
          />
          <div className="product-dialog-metainfo">
            <p className="product-category">{product.category}</p>
            <p className="product-dialog-rating">
              Rating: {product.rating.rate}/5 ({product.rating.count})
            </p>
          </div>
          <h2 className="product-dialog-title">{product.title}</h2>
          <span className="product-dialog-price">
            {CURRENCY}
            {product.price}
          </span>
          <span className="product-dialog-description">
            {product.description}
          </span>
          <div className="product-dialog-controlls">
            <button
              className="product-dialog-button-close"
              // autoFocus
              onClick={closeDialog}
              onKeyUp={(e) => {
                if (e.key === "Enter") closeDialog();
              }}
              onKeyDown={async (e) => {
                if (e.key !== "Tab") e.preventDefault();
                if (e.key === " ") closeDialog();
              }}
            >
              Close
            </button>
            <label htmlFor="quantity" className="label">
              Quantity:{" "}
            </label>
            <input
              tabIndex={0}
              type="number"
              name="quantity"
              id="quantity"
              maxLength={2}
              max={99}
              size={2}
              value={quantity}
              onInput={(e) => {
                setQuantity(Number.parseInt(e.currentTarget.value));
              }}
            />
            <button
              tabIndex={0}
              className="product-dialog-button-append"
              onClick={() => {
                setCart(
                  (prev: Cart): Cart => ({
                    ...prev,
                    [product.id]: {
                      image: product.image,
                      price: product.price,
                      title: product.title,
                      quantity,
                    },
                  })
                );
                closeDialog();
              }}
              // onKeyUp={(e) => e.preventDefault()}
              onKeyDown={(e) => e.preventDefault()}
              onKeyUp={async (e) => {
                if (e.key !== "Tab") e.preventDefault();
                if (e.key === "Enter" || e.key === " ") {
                  closeDialog();
                }
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}

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
      <ShopItemCard openDialog={openDialog} product={product} />
      <ShopItemDialog
        closeDialog={closeDialog}
        dialogRef={dialogRef}
        itemId={product.id}
      />
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
