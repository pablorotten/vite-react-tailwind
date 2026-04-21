import { useState } from "react";
import HeadingWithAnchor from "./HeadingWithAnchor";

export default function OnClickDemo() {
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
    <div className="card">
      <HeadingWithAnchor id="onclick-dynamic-classname" level={2}>Using `onClick` function in a button and dynamic `className`</HeadingWithAnchor>
      <button
        onClick={handleCount}
        className={`clear-button ${isEven ? "even" : "odd"}`}
      >
        count is {count}
      </button>
    </div>
  );
}