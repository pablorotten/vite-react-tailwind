import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h2>I have default h2 style</h2>
      <h2
        style={{
          color: "#a1ef06",
          background:
            "linear-gradient(40deg, #ea00ff, #ea00ff, #03d5ff, #03d5ff)",
        }}
      >
        I have inline h2 style
      </h2>
    </header>
  );
}
