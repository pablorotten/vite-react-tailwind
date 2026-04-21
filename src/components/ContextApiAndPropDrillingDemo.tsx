import PropDrillingDemo from "./PropDrillingDemo";
import ContextApiDemo from "./ContextApiDemo";

export default function ContextApiAndPropDrillingDemo() {
  return (
    <>
      <h1>Context API and Prop Drilling</h1>
      <div className="card">
        <PropDrillingDemo />
        <ContextApiDemo />
      </div>
    </>
  );
}
