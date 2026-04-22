import { useReducer, useState } from "react";
import HeadingWithAnchor from "./HeadingWithAnchor";

type CounterState = {
  count: number;
  step: number;
  clicks: number;
};

type CounterAction =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "change_step"; value: number }
  | { type: "reset" };

const initialState: CounterState = {
  count: 0,
  step: 1,
  clicks: 0,
};

function reducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case "increment":
      // keep same step and clicks, but update count based on step and increment clicks by 1
      return {
        ...state,
        count: state.count + state.step,
        clicks: state.clicks + 1,
      };
    case "decrement":
      return {
        // keep same step and clicks, but update count based on step and increment clicks by 1
        ...state,
        count: state.count - state.step,
        clicks: state.clicks + 1,
      };
    case "change_step":
      // keep same count and clicks, but update step based on action.value
      return {
        ...state,
        step: action.value,
      };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export default function UseReducerDemo() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [clicks, setClicks] = useState(0);

  const [state, dispatch] = useReducer(reducer, initialState);

  function incrementWithState() {
    setCount((previousCount) => previousCount + step);
    setClicks((previousClicks) => previousClicks + 1);
  }

  function decrementWithState() {
    setCount((previousCount) => previousCount - step);
    setClicks((previousClicks) => previousClicks + 1);
  }

  function resetWithState() {
    setCount(0);
    setStep(1);
    setClicks(0);
  }

  return (
    <>
      <HeadingWithAnchor id="complex-state-usereducer" level={2}>
        useState vs useReducer
      </HeadingWithAnchor>
      <section>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded border border-orange-300 bg-orange-50 p-4 text-left">
            <h3 className="mb-2 text-lg font-bold">Version A: many useState hooks</h3>
            <p className="text-sm">count: {count}</p>
            <p className="text-sm">step: {step}</p>
            <p className="text-sm">clicks: {clicks}</p>

            <label className="mt-3 mb-1 block text-sm font-semibold" htmlFor="step-state">
              Step
            </label>
            <input
              id="step-state"
              type="number"
              min={1}
              value={step}
              onChange={(event) => setStep(Math.max(1, Number(event.target.value) || 1))}
              className="mb-3 w-full rounded border border-gray-300 bg-white px-3 py-2"
            />

            <div className="flex flex-wrap gap-2">
              <button type="button" className="primary-button" onClick={incrementWithState}>
                +
              </button>
              <button
                type="button"
                className="rounded border border-gray-500 px-3 py-2 text-sm text-gray-800"
                onClick={decrementWithState}
              >
                -
              </button>
              <button
                type="button"
                className="rounded border border-gray-500 px-3 py-2 text-sm text-gray-800"
                onClick={resetWithState}
              >
                Reset
              </button>
            </div>
          </article>

          <article className="rounded border border-emerald-300 bg-emerald-50 p-4 text-left">
            <h3 className="mb-2 text-lg font-bold">Version B: one reducer + actions</h3>
            <p className="text-sm">count: {state.count}</p>
            <p className="text-sm">step: {state.step}</p>
            <p className="text-sm">clicks: {state.clicks}</p>

            <label
              className="mt-3 mb-1 block text-sm font-semibold"
              htmlFor="step-reducer"
            >
              Step
            </label>
            <input
              id="step-reducer"
              type="number"
              min={1}
              value={state.step}
              onChange={(event) =>
                dispatch({
                  type: "change_step",
                  value: Math.max(1, Number(event.target.value) || 1),
                })
              }
              className="mb-3 w-full rounded border border-gray-300 bg-white px-3 py-2"
            />

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="primary-button"
                onClick={() => dispatch({ type: "increment" })}
              >
                +
              </button>
              <button
                type="button"
                className="rounded border border-gray-500 px-3 py-2 text-sm text-gray-800"
                onClick={() => dispatch({ type: "decrement" })}
              >
                -
              </button>
              <button
                type="button"
                className="rounded border border-gray-500 px-3 py-2 text-sm text-gray-800"
                onClick={() => dispatch({ type: "reset" })}
              >
                Reset
              </button>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}