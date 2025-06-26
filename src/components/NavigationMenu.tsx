import { Link, useNavigate } from "react-router-dom";
import styles from "./NavigationMenu.module.css";

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
  return (
    <div className={styles["right"]}>
      <ul className={styles["ul"]}>
        {links.map((link) => (
          <RightLinks link={link} />
        ))}
        <li>
          <a className={styles["shopping-cart"]}>Cart</a>
        </li>
      </ul>
    </div>
  );
}
