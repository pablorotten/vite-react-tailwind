import { useState } from "react";
import "./App.css";
import Header from "./Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <main>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs"></p>
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
      </main>
    </>
  );
}

export default App;
