import AuthInputs from "./AuthInputs";
import FlexibleCard from "./FlexibleCard";

export default function ChildPatternDemo() {
  return (
    <>
        <h2>Child pattern</h2>
        <div className="space-y-3">
          <FlexibleCard title="Here &lt;FlexibleCard/&gt; children">
            <p>is a string</p>
          </FlexibleCard>

          <FlexibleCard title="Here &lt;FlexibleCard/&gt; children is <AuthInputs/> component">
            <AuthInputs />
          </FlexibleCard>

          <FlexibleCard
            title="&lt;FlexibleCard/&gt; with no children"
            footer={
              <button className="px-3 py-1 bg-indigo-600 text-white rounded">
                Just footer as a button
              </button>
            }
            className="border-l-4 border-indigo-200"
          >
            <></>
          </FlexibleCard>
        </div>
        </>
  )
}
