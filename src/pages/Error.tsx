import { Link } from "react-router-dom";
export default function Error() {
  return (
    <section>
      <h1>ERROR</h1>
      <Link to={"/home"}>Return to the homepage</Link>
    </section>
  );
}
