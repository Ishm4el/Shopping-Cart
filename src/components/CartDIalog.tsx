import useShoppingCartContext from "./useShoppingCartContext";
import styles from "./NavigationMenu.module.css";

function EmptyCartResponse({ closeDialog }: { closeDialog: () => void }) {
  return (
    <>
      <span className={styles["dialog-cart-empty"]}>
        There are currently no items in your cart!
      </span>
      <button
        className={styles["dialog-button-close"]}
        onKeyDown={(e) => {
          e.preventDefault();
          if (e.key === " ") closeDialog();
        }}
        onKeyUp={(e) => {
          e.preventDefault();
          if (e.key === "Enter") closeDialog();
        }}
        onClick={closeDialog}
      >
        Close
      </button>
    </>
  );
}

function CartDialogList({ cart }: { cart: Cart }) {
  return (
    <ul className={styles["cart-list"]}>
      {Object.entries(cart).map(([key, value]) => (
        <li className={styles["cart-list-item"]} key={`cart-list-${key}`}>
          <img
            src={value.image}
            alt=""
            className={styles["dialog-item-image"]}
          />
          <span className={styles["dialog-item-title"]}>{value.title}</span>
          <span className={styles["dialog-item-quantity"]}>
            Quantity: {value.quantity}
          </span>
          <span className={styles["dialog-item-price"]}>${value.price}</span>
        </li>
      ))}
    </ul>
  );
}

function CartDialogControls({
  closeDialog,
  setCart,
  total,
}: {
  closeDialog: () => void;
  setCart: setCart;
  total: number;
}) {
  return (
    <div className={styles["dialog-controls"]}>
      <button
        className={styles["dialog-button-close"]}
        onClick={closeDialog}
        onKeyUp={async (e) => {
          e.preventDefault();
          if (e.key === "Enter") closeDialog();
        }}
        onKeyDown={(e) => {
          if (e.key !== "Tab") e.preventDefault();
          if (e.key === " ") closeDialog();
        }}
        tabIndex={0}
      >
        Close
      </button>
      <button
        className={styles["dialog-button-purchase"]}
        onClick={() => {
          alert(
            `You have made your purchase!\nYou have been charged: ${total}`
          );
          closeDialog();
          setCart({});
        }}
        tabIndex={0}
        autoFocus
      >
        Make Purchase
      </button>
    </div>
  );
}

function PopulatedCartResopnse({
  cart,
  total,
  closeDialog,
  setCart,
}: {
  cart: Cart;
  total: number;
  closeDialog: () => void;
  setCart: setCart;
}) {
  return (
    <>
      <CartDialogList cart={cart} />
      <span className={styles["dialog-total-price"]}>Total: ${total}</span>
      <CartDialogControls
        closeDialog={closeDialog}
        setCart={setCart}
        total={total}
      />
    </>
  );
}

export default function CartDialog({
  dialogRef,
  closeDialog,
}: {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  closeDialog: () => void;
}) {
  const { cart, setCart } = useShoppingCartContext();
  const total: number = Object.values(cart).reduce(
    (a, b) => a + b.price * b.quantity,
    0
  );

  return (
    <dialog ref={dialogRef} onClick={closeDialog} className={styles["dialog"]}>
      <div
        className={styles["dialog-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        {total === 0 ? (
          <EmptyCartResponse closeDialog={closeDialog} />
        ) : (
          <PopulatedCartResopnse
            cart={cart}
            closeDialog={closeDialog}
            setCart={setCart}
            total={total}
          />
        )}
      </div>
    </dialog>
  );
}
