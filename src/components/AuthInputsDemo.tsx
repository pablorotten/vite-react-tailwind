import AuthInputs from "./AuthInputs";
import HeadingWithAnchor from "./HeadingWithAnchor";

export default function AuthInputsDemo() {
  return (
    <div className="card">
      <HeadingWithAnchor id="authinputs-component" level={2}>
        ‹AuthInputs /› component
      </HeadingWithAnchor>
      <AuthInputs />
    </div>
  );
}
