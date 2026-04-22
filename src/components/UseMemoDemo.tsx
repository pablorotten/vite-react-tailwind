import { memo, useMemo, useState } from "react";
import HeadingWithAnchor from "./HeadingWithAnchor";

export default function UseMemoDemo() {
  return (
    <div className="card">
      <section>
        <HeadingWithAnchor id="memo-usememo" level={2}>
          memo and useMemo()
        </HeadingWithAnchor>
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
      <p>
        Parent - {parent} (doubled: {double()})
      </p>
      <button onClick={updateParent}>Update Parent</button>
      <button onClick={updateChild1}>Update Child 1</button>
      <button onClick={updateChild2}>Update Child 2</button>
      <Child1NoMemo value={child1} />
      <Child2NoMemo value={child2} />
    </>
  );
};

const Child1NoMemo = ({ value }: { value: number }) => {
  console.log("ChildNoMemo 1 rerendered");

  return <p>Child 1 - {value}</p>;
};

const Child2NoMemo = ({ value }: { value: number }) => {
  console.log("ChildNoMemo 2 rerendered");

  return <p>Child 2- {value}</p>;
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
      <p>
        Parent - {parent} (doubled: {double})
      </p>
      <button onClick={updateParent}>Update Parent</button>
      <button onClick={updateChild1}>Update Child 1</button>
      <button onClick={updateChild2}>Update Child 2</button>
      <Child1Memo value={child1} />
      <Child2Memo value={child2} />
    </>
  );
};

const Child1Memo = memo(({ value }: { value: number }) => {
  console.log("ChildMemo 1 rerendered");

  return <p>Child 1 - {value}</p>;
});

const Child2Memo = memo(({ value }: { value: number }) => {
  console.log("ChildMemo 2 rerendered");

  return <p>Child 2- {value}</p>;
});
