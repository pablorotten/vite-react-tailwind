import ChildPatternDemo from "./ChildPatternDemo";
import PresenterPatternDemo from "./PresenterPatternDemo";
import CompoundComponentsDemo from "./CompoundComponentsDemo";

export default function ComponentCompositionAndReusabilityDemo() {
  return (
    <>
      <h1>Component Composition & Reusability</h1>
      <div className="card">
        <ChildPatternDemo />
        <PresenterPatternDemo />
        <CompoundComponentsDemo />
      </div>
    </>
  );
}
