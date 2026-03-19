import { Link } from "react-router-dom";
import "./Header.css";

export default function Navigation() {
  return (
    <nav className="app-nav" style={{ padding: 12 }}>
      <Link to="/" style={{ marginRight: 12 }}>
        Home
      </Link>
      <Link to="/about">About</Link>
    </nav>
  );
}
