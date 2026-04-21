import HeadingWithAnchor from "./HeadingWithAnchor";
interface User {
  name: string;
  role: "admin" | "editor" | "viewer";
}

export default function PropDrillingDemo() {
  return (
    <div className="space-y-2">
      <HeadingWithAnchor id="prop-drilling-problem" level={2}>
        ⛏️ Prop Drilling Problem ⛏️
      </HeadingWithAnchor>
      <Component1 />
    </div>
  );
}

function Component1() {
  const currentUser: User = { name: "Alice", role: "admin" };

  return (
    <div className="border rounded-lg p-4 bg-gray-50 space-y-2">
      <p>
        <code>{"function Component1()"}</code>
      </p>
      <p>
        <code>
          {"const currentUser: User = { name: 'Alice', role: 'admin' };"}
        </code>
      </p>
      <p className="text-sm italic text-gray-400">
        <code>{"<Component2 user={currentUser} />"}</code> ⬇️
      </p>
      <Component2 user={currentUser} />
    </div>
  );
}

function Component2({ user }: { user: User }) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50 space-y-2">
      <code>{"function Component2({ user }>"}</code>
      <p className="text-sm italic text-gray-400">
        <code>{"<Component3 user={user} />"}</code> ⬇️
      </p>
      <Component3 user={user} />
    </div>
  );
}

function Component3({ user }: { user: User }) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50 space-y-2">
      <code>{"function Component3({ user }>"}</code>
      <p className="text-sm italic text-gray-400">
        <code>{"<Component4 user={user} />"}</code> ⬇️
      </p>
      <Component4 user={user} />
    </div>
  );
}

const roleColor: Record<User["role"], string> = {
  admin: "bg-red-100 text-red-700 border-red-300",
  editor: "bg-blue-100 text-blue-700 border-blue-300",
  viewer: "bg-gray-100 text-gray-600 border-gray-300",
};

function Component4({ user }: { user: User }) {
  return (
    <div className="border rounded-lg p-4 bg-white space-y-1">
      <code>{"function Component4({ user }>"}</code>
      <p className="text-sm font-medium">
        ✅ Finally using <code>user</code> here:
      </p>
      <div className="flex items-center justify-center gap-2">
        <span className="font-semibold">{user.name}</span>
        <span
          className={`px-2 py-0.5 text-xs rounded-full border ${roleColor[user.role]}`}
        >
          {user.role}
        </span>
      </div>
    </div>
  );
}
