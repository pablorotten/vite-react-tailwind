import { Link } from "react-router-dom";
import HeadingWithAnchor from "../components/HeadingWithAnchor";

export default function NotFound() {
  return (
    <div style={{ padding: 20 }}>
      <HeadingWithAnchor id="page-not-found" level={1}>
        Page Not Found
      </HeadingWithAnchor>
      <p>The requested page does not exist.</p>
      <p>
        <Link to="/">Return to Home</Link>
      </p>
    </div>
  );
}
