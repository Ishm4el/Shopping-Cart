import { Outlet } from "react-router-dom";
import NavigationMenu from "./components/NavigationMenu";
import siteLogo from "/shopping_bag.svg";
import styles from "./App.module.css";
import { useState } from "react";
import { ShoppingCartContext } from "./components/useShoppingCartContext";

// CONFIG
// title of the website
const WEBSITE_TITLE = "Website Title";
// links for the navigationbar
const links: { title: string; hyperlink: string }[] = [
  { title: "Home", hyperlink: "/home" },
  { title: "Shop", hyperlink: "/shop" },
];

export default function App() {
  const [cart, setCart] = useState<Cart>({});
  return (
    <>
      <ShoppingCartContext.Provider value={{ cart, setCart }}>
        <NavigationMenu title={WEBSITE_TITLE} logo={siteLogo} links={links} />
        <main className={styles["main"]}>
          <Outlet />
        </main>
      </ShoppingCartContext.Provider>
    </>
  );
}
