import type { RouteObject } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import App from "./App";
const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [{ index: true, element: <Home /> }],
  },
];

export default routes;
