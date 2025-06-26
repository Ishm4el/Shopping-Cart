import { Link, useNavigate } from "react-router-dom";
import styles from "./NavigationMenu.module.css";
import { useRef } from "react";
import useShoppingCartContext from "./useShoppingCartContext";

export default function NavigationMenu({
  logo,
  title,
  links,
}: {
  logo: string;
  title: string;
  links: { title: string; hyperlink: string }[];
}) {
  return (
    <nav className={styles["nav"]}>
      <Left logo={logo} title={title} />
      <Right links={links} />
    </nav>
  );
}

function Left({ logo, title }: { logo: string; title: string }) {
  const navigate = useNavigate();
  return (
    <div className={styles["left"]}>
      <img
        className={styles["img"]}
        src={logo}
        alt="Site_Logo"
        onClick={() => navigate("/")}
      />
      <Link to={"/"} className={styles["link"]}>
        {title}
      </Link>
    </div>
  );
}

function RightLinks({ link }: { link: { title: string; hyperlink: string } }) {
  return (
    <li>
      <Link to={link.hyperlink} className={styles["link"]}>
        {link.title}
      </Link>
    </li>
  );
}

function Right({ links }: { links: { title: string; hyperlink: string }[] }) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const { cart, setCart } = useShoppingCartContext();

  const openDialog = () => {
    if (dialogRef.current) dialogRef.current.showModal();
  };

  const closeDialog = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  const total: number = Object.values(cart).reduce(
    (a, b) => a + b.price * b.quantity,
    0
  );

  return (
    <div className={styles["right"]}>
      <ul className={styles["ul"]}>
        {links.map((link) => (
          <RightLinks link={link} />
        ))}
        <li>
          <a
            className={styles["shopping-cart"]}
            onClick={openDialog}
            tabIndex={0}
          >
            Cart
          </a>
          <dialog
            ref={dialogRef}
            onClick={closeDialog}
            className={styles["dialog"]}
          >
            <div
              className={styles["dialog-content"]}
              onClick={(e) => e.stopPropagation()}
            >
              {total === 0 ? (
                <>
                  <span className={styles["dialog-cart-empty"]}>
                    There are currently no items in your cart!
                  </span>
                  <button
                    className={styles["dialog-button-close"]}
                    onClick={closeDialog}
                  >
                    Close
                  </button>
                </>
              ) : (
                <>
                  <ul className={styles["cart-list"]}>
                    {Object.entries(cart).map(([key, value]) => (
                      <li
                        className={styles["cart-list-item"]}
                        key={`cart-list-${key}`}
                      >
                        <img
                          src={value.image}
                          alt=""
                          className={styles["dialog-item-image"]}
                        />
                        <span className={styles["dialog-item-title"]}>
                          {value.title}
                        </span>
                        <span className={styles["dialog-item-quantity"]}>
                          Quantity: {value.quantity}
                        </span>
                        <span className={styles["dialog-item-price"]}>
                          ${value.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <span className={styles["dialog-total-price"]}>
                    Total: ${total}
                  </span>
                  <div className={styles["dialog-controls"]}>
                    <button
                      className={styles["dialog-button-close"]}
                      onClick={closeDialog}
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
                    >
                      Make Purchase
                    </button>
                  </div>
                </>
              )}
            </div>
          </dialog>
        </li>
      </ul>
    </div>
  );
}
