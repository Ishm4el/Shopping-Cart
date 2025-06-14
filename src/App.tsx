import { Outlet } from "react-router-dom";
import NavigationMenu from "./components/NavigationMenu";

export default function App() {
  return (
    <>
    <NavigationMenu />
      <body>
        <Outlet />
      </body>
    </>
  );
}
