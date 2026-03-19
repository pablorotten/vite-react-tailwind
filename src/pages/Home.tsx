import { useState } from "react";
import Header from "../components/Header";
import AuthInputs from "../components/AuthInputs";
import Nationalize from "../components/Nationalize";
import ScreenSizeMonitor from "../components/ScreenSizeMonitor";
import "../App.css";

export default function Home() {
  const [count, setCount] = useState(0);
  const [isEven, setIsEven] = useState(false);

  function handleCount() {
    setCount((count) => count + 1);
    handleIsEven();
  }

  function handleIsEven() {
    setIsEven(count % 2 === 0);
  }

  return (
    <>
      <Header />
      <main>
        <div className="card">
          <button
            onClick={handleCount}
            className={`clear-button ${isEven ? "even" : "odd"}`}
          >
            count is {count}
          </button>
        </div>
        <p className="read-the-docs"></p>

        <div className="card">
          <AuthInputs />
        </div>
        <div className="card">
          <Nationalize />
        </div>
        <div className="card">
          <ScreenSizeMonitor />
        </div>
      </main>
    </>
  );
}
