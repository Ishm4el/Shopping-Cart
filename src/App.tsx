import { Outlet } from "react-router-dom";
import NavigationMenu from "./components/NavigationMenu";
import siteLogo from "/shopping_bag.svg";
import styles from "./App.module.css";

// CONFIG
// title of the website
const WEBSITE_TITLE = "Website Title";
// links for the navigationbar
const links: { title: string; hyperlink: string }[] = [
  { title: "Home", hyperlink: "/home" },
  { title: "Shop", hyperlink: "/shop" },
];

export default function App() {
  return (
    <>
      <NavigationMenu title={WEBSITE_TITLE} logo={siteLogo} links={links} />
      <body className={styles["body"]}>
        <Outlet />
      </body>
    </>
  );
}
