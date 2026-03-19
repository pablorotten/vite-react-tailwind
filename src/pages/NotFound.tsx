import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Page Not Found</h1>
      <p>The requested page does not exist.</p>
      <p>
        <Link to="/">Return to Home</Link>
      </p>
    </div>
  );
}
