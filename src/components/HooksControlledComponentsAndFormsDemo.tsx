import { useState } from "react";
import HeadingWithAnchor from "./HeadingWithAnchor";
import AuthInputs from "./AuthInputs";
import UseEffectDemo from "./UseEffectDemo";
import UseReducerDemo from "./UseReducerDemo";
import UseMemoDemo from "./UseMemoDemo";

export default function HooksControlledComponentsAndFormsDemo() {
  const [count, setCount] = useState(0);
  const isEven = count % 2 === 0;

  function handleCount() {
    setCount((previousCount) => previousCount + 1);
  }

  return (
    <>
      <HeadingWithAnchor id="hooks-controlled-components-forms" level={1}>
        Hooks, Controlled Components & Forms
      </HeadingWithAnchor>
      <div className="card">
        <HeadingWithAnchor id="onclick-dynamic-classname" level={2}>
          Using `onClick` function in a button and dynamic `className`
        </HeadingWithAnchor>
        <button
          onClick={handleCount}
          className={`clear-button ${isEven ? "even" : "odd"}`}
        >
          count is {count}
        </button>
        <HeadingWithAnchor id="authinputs-component" level={2}>
          ‹AuthInputs /› component
        </HeadingWithAnchor>
        <AuthInputs />
        <UseEffectDemo />
        <UseReducerDemo />
        <UseMemoDemo />
      </div>
    </>
  );
}
