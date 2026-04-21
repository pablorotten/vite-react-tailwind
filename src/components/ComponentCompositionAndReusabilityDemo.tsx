import ChildPatternDemo from "./ChildPatternDemo";
import PresenterPatternDemo from "./PresenterPatternDemo";
import CompoundComponentsDemo from "./CompoundComponentsDemo";
import HeadingWithAnchor from "./HeadingWithAnchor";

export default function ComponentCompositionAndReusabilityDemo() {
  return (
    <>
      <HeadingWithAnchor id="component-composition-reusability" level={1}>
        Component Composition & Reusability
      </HeadingWithAnchor>
      <div className="card">
        <ChildPatternDemo />
        <PresenterPatternDemo />
        <CompoundComponentsDemo />
      </div>
    </>
  );
}
