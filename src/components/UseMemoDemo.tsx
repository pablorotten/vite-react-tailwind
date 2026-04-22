import { memo, useMemo, useState } from "react";
import HeadingWithAnchor from "./HeadingWithAnchor";

const buttonBaseClass =
  "inline-flex items-center rounded-md border px-3 py-2 text-sm font-semibold shadow-sm transition active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

type CounterCardProps = {
  label: string;
  value: number;
  accentClass: string;
  helperText?: string;
};

function CounterCard({ label, value, accentClass, helperText }: CounterCardProps) {
  return (
    <div className={`rounded-lg border p-3 text-center shadow-sm ${accentClass}`}>
      <p className="text-xs font-semibold uppercase tracking-wide opacity-75">{label}</p>
      <p className="mt-1 text-2xl font-black leading-none">{value}</p>
      {helperText ? <p className="mt-1 text-xs opacity-80">{helperText}</p> : null}
    </div>
  );
}

export default function UseMemoDemo() {
  return (
    <div className="card">
      <section>
        <HeadingWithAnchor id="memo-usememo" level={2}>
          memo and useMemo()
        </HeadingWithAnchor>
        <p className="mb-3 text-sm text-slate-600">
          Open the browser console logs to see when each parent and child re-renders.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded border border-orange-300 bg-orange-50 p-4 text-left">
            <h3 className="mb-2 text-lg font-bold">❌ memo ❌ useMemo</h3>
            <ParentNoMemo />
          </article>
          <article className="rounded border border-emerald-300 bg-emerald-50 p-4 text-left">
            <h3 className="mb-2 text-lg font-bold">✅ memo ✅ useMemo</h3>
            <ParentMemo />
          </article>
        </div>
      </section>
    </div>
  );
}

// Without memo and useMemo, every time Parent re-renders, both Child1 and Child2 will also re-render, even if their props haven't changed. With memo and useMemo, we can optimize this so that Child1 and Child2 only re-render when their respective props change, not when the Parent re-renders due to changes in other state variables.
const ParentNoMemo = () => {
  const [parent, setParent] = useState(0);
  const [child1, setChild1] = useState(0);
  const [child2, setChild2] = useState(0);

  const updateParent = () => {
    setParent(Math.floor(Math.random() * 100) + 1);
  };

  const updateChild1 = () => {
    setChild1(Math.floor(Math.random() * 100) + 1);
  };

  const updateChild2 = () => {
    setChild2(Math.floor(Math.random() * 100) + 1);
  };


  const double = () => {
    console.log("double function recomputed");
    return parent * 2;
  };

  console.log("ParentNoMemo rerendered");

  return (
    <>
      <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <CounterCard
          label="Parent"
          value={parent}
          helperText={`Doubled: ${double()}`}
          accentClass="border-orange-300 bg-white"
        />
        <Child1NoMemo value={child1} />
        <Child2NoMemo value={child2} />
      </div>
      <div className="mt-3 mb-3 flex flex-wrap gap-2">
        <button
          onClick={updateParent}
          className={`${buttonBaseClass} border-slate-300 bg-white text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400`}
        >
          🔄️ Parent
        </button>
        <button
          onClick={updateChild1}
          className={`${buttonBaseClass} border-amber-300 bg-amber-100 text-amber-900 hover:bg-amber-200 focus-visible:ring-amber-500`}
        >
          🔄️ Child 1
        </button>
        <button
          onClick={updateChild2}
          className={`${buttonBaseClass} border-orange-300 bg-orange-100 text-orange-900 hover:bg-orange-200 focus-visible:ring-orange-500`}
        >
          🔄️ Child 2
        </button>
      </div>
    </>
  );
};

const Child1NoMemo = ({ value }: { value: number }) => {
  console.log("ChildNoMemo 1 rerendered");

  return (
    <CounterCard
      label="Child 1"
      value={value}
      accentClass="border-amber-300 bg-amber-100"
    />
  );
};

const Child2NoMemo = ({ value }: { value: number }) => {
  console.log("ChildNoMemo 2 rerendered");

  return (
    <CounterCard
      label="Child 2"
      value={value}
      accentClass="border-orange-300 bg-orange-100"
    />
  );
};

// Using memo and useMemo to avoid unnecessary re-renders and computations in Parent and Child components
const ParentMemo = () => {
  const [parent, setParent] = useState(0);
  const [child1, setChild1] = useState(0);
  const [child2, setChild2] = useState(0);

  const updateParent = () => {
    setParent(Math.floor(Math.random() * 100) + 1);
  };

  const updateChild1 = () => {
    setChild1(Math.floor(Math.random() * 100) + 1);
  };

  const updateChild2 = () => {
    setChild2(Math.floor(Math.random() * 100) + 1);
  };

  // useMemo: only recomputes when `parent` changes, not when child1/child2 change
  const double = useMemo(() => {
    console.log("double function recomputed");
    return parent * 2;
  }, [parent]);

  console.log("ParentMemo rerendered");

  return (
    <>
      <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <CounterCard
          label="Parent"
          value={parent}
          helperText={`Doubled: ${double}`}
          accentClass="border-emerald-300 bg-white"
        />
        <Child1Memo value={child1} />
        <Child2Memo value={child2} />
      </div>
      <div className="mt-3 mb-3 flex flex-wrap gap-2">
        <button
          onClick={updateParent}
          className={`${buttonBaseClass} border-slate-300 bg-white text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400`}
        >
          🔄️ Parent
        </button>
        <button
          onClick={updateChild1}
          className={`${buttonBaseClass} border-emerald-300 bg-emerald-100 text-emerald-900 hover:bg-emerald-200 focus-visible:ring-emerald-500`}
        >
          🔄️ Child 1
        </button>
        <button
          onClick={updateChild2}
          className={`${buttonBaseClass} border-teal-300 bg-teal-100 text-teal-900 hover:bg-teal-200 focus-visible:ring-teal-500`}
        >
          🔄️ Child 2
        </button>
      </div>
    </>
  );
};

const Child1Memo = memo(({ value }: { value: number }) => {
  console.log("ChildMemo 1 rerendered");

  return (
    <CounterCard
      label="Child 1"
      value={value}
      accentClass="border-emerald-300 bg-emerald-100"
    />
  );
});

const Child2Memo = memo(({ value }: { value: number }) => {
  console.log("ChildMemo 2 rerendered");

  return (
    <CounterCard
      label="Child 2"
      value={value}
      accentClass="border-teal-300 bg-teal-100"
    />
  );
});
