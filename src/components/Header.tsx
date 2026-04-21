import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "./Header.css";
import HeadingWithAnchor from "./HeadingWithAnchor";

export default function Header() {
  return (
    <header>
      <div className="logo-row">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <HeadingWithAnchor id="vite-react" level={1}>Vite + React</HeadingWithAnchor>
    </header>
  );
}
