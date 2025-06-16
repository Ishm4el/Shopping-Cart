import "./pages.css";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <section className="section">
      <h1 className="section-title">ERROR</h1>
      <Link to={"/home"} className="error-link">
        Return to the homepage
      </Link>
    </section>
  );
}
