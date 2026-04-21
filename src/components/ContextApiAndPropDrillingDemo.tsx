import PropDrillingDemo from "./PropDrillingDemo";
import ContextApiDemo from "./ContextApiDemo";
import HeadingWithAnchor from "./HeadingWithAnchor";

export default function ContextApiAndPropDrillingDemo() {
  return (
    <>
      <HeadingWithAnchor id="context-api-and-prop-drilling" level={1}>Context API and Prop Drilling</HeadingWithAnchor>
      <div className="card">
        <PropDrillingDemo />
        <ContextApiDemo />
      </div>
    </>
  );
}
