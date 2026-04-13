import AuthInputs from "./AuthInputs";
import FlexibleCard from "./FlexibleCard";
import UserListPresenter from "./UserListPresenter";

export default function ComponentCompositionDemo() {
  return (
    <div className="card">
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
        <h2>Presenter pattern</h2>

        <UserListPresenter
          render={({ users, pickRandomUsers }) => (
            <FlexibleCard title="Showing users in a list">
              <ul className="mb-3 list-disc list-inside">
                {users.map((user) => (
                  <li key={user}>{user}</li>
                ))}
              </ul>
              <button
                onClick={pickRandomUsers}
                className="px-3 py-1 bg-indigo-600 text-white rounded"
              >
               pickRandomUsers from UserListPresenter
              </button>
            </FlexibleCard>
          )}
        />

        <UserListPresenter
          render={({ users, pickRandomUsers }) => (
            <div className="p-4 rounded border border-indigo-200 bg-indigo-50 text-center">
              <p className="font-semibold mb-2">Showing users in divs</p>
              <div className="flex flex-wrap justify-center gap-2 mb-3">
                {users.map((user) => (
                  <span key={user} className="rounded-full bg-white px-3 py-1 border border-indigo-200">
                    {user}
                  </span>
                ))}
              </div>
              <button
                onClick={pickRandomUsers}
                className="px-3 py-1 bg-indigo-600 text-white rounded"
              >
                Shuffle users
              </button>
            </div>
          )}
        />

        <UserListPresenter
          render={({ users, pickRandomUsers }) => (
            <div className="p-4 rounded border border-indigo-200 bg-indigo-50 text-center">
              <p className="font-semibold mb-2">Showing users in a 3x1 table</p>
              <table className="mx-auto mb-3 border border-indigo-200 bg-white">
                <tbody>
                  {users.map((user) => (
                    <tr key={user} className="border-b border-indigo-200 last:border-b-0">
                      <td className="px-4 py-2">{user}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={pickRandomUsers}
                className="px-3 py-1 bg-indigo-600 text-white rounded"
              >
                Shuffle table users
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
}
