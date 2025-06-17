import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import AuthInputs from "./components/AuthInputs";

function App() {
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
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs"></p>

        <div className="card">
          <AuthInputs />
        </div>
        <div className="card">
          <h2>Tailwind test:</h2>
          <div className="space-y-4 text-center font-mono text-xs font-bold text-white">
            <div className="hidden w-96 rounded-lg bg-blue-500 px-4 py-2 sm:block">
              w-96
            </div>
            <div className="hidden w-80 rounded-lg bg-blue-500 px-4 py-2 sm:block">
              w-80
            </div>
            <div className="hidden w-64 rounded-lg bg-blue-500 px-4 py-2 sm:block">
              w-64
            </div>
            <div className="w-48 rounded-lg bg-blue-500 px-4 py-2">w-48</div>
            <div className="w-40 rounded-lg bg-blue-500 px-4 py-2">w-40</div>
            <div className="w-32 rounded-lg bg-blue-500 px-4 py-2">w-32</div>
            <div className="w-24 rounded-lg bg-blue-500 px-4 py-2">w-24</div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
