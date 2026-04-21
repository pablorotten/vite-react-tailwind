import { createContext, useContext } from "react";
import HeadingWithAnchor from "./HeadingWithAnchor";

// ─── Types ───────────────────────────────────────────────────────────────────

interface User {
  name: string;
  role: "admin" | "editor" | "viewer";
}

const UserContext = createContext<User | null>(null);

export default function ContextApiDemo() {
  return (
    // Defines context
    <UserContext.Provider value={null}>
      <div className="space-y-4">
            <HeadingWithAnchor id="context-api-solution" level={2}>✅ Context API Solution ✅</HeadingWithAnchor>
        <p className="text-sm italic text-gray-400">
          Defines context but user is <code>null</code>
        </p>
        <p>
          <code>{"<UserContext.Provider value={null}>"}</code>
        </p>
        <Component1 />
      </div>
    </UserContext.Provider>
  );
}

function Component1() {
  const currentUser: User = { name: "Alice", role: "editor" };

  return (
    // Add user to context
    <UserContext.Provider value={currentUser}>
      <div className="border rounded-lg p-4 bg-gray-50 space-y-2">
        <p>
          <code>{"function Component1()"}</code>
        </p>

        <p className="text-sm italic text-gray-400">
          Stores <code>currentUser</code> in <code>Context</code>
        </p>
        <p>
          <code>{"<UserContext.Provider value={currentUser}>"}</code>
        </p>
        <img
          src="/images/ContextAPI.gif"
          alt="Context API flow"
          style={{
            width: "100%",
            maxWidth: 400,
            margin: "0 auto",
            display: "block",
          }}
        />

        <p className="text-sm italic text-gray-400">
          <code>{"<Component2/>"}</code>
        </p>
        <Component2 />
      </div>
    </UserContext.Provider>
  );
}

function Component2() {
  return (
    <div className="border rounded-lg p-4 bg-gray-50 space-y-2">
      <code>{"function Component2()"}</code>
      <p className="text-sm italic text-gray-400">
        <code>{"<Component3/>"}</code>
      </p>
      <Component3 />
    </div>
  );
}

function Component3() {
  return (
    <div className="border rounded-lg p-4 bg-gray-100 space-y-2">
      <code>{"function Component3()"}</code>
      <p className="text-sm italic text-gray-400">
        <code>{"<Component4/>"}</code>
      </p>
      <Component4 />
    </div>
  );
}

const roleColor: Record<User["role"], string> = {
  admin: "bg-red-100 text-red-700 border-red-300",
  editor: "bg-blue-100 text-blue-700 border-blue-300",
  viewer: "bg-gray-100 text-gray-600 border-gray-300",
};

function Component4() {
  // Consumes user in context
  const user = useContext(UserContext);

  if (!user) return null;

  return (
    <div className="border rounded-lg p-4 bg-white space-y-1">
      <code>{"function Component4()"}</code>
      <p>
        <code>{"const user = useContext(UserContext);"}</code>
      </p>
      <p className="text-sm italic text-gray-400">
        Consumes <code>user</code> from <code>Context</code>
      </p>
      <img
        src="/images/ContextAPI2.gif"
        alt="Context API flow"
        style={{
          width: "100%",
          maxWidth: 300,
          margin: "0 auto",
          display: "block",
        }}
      />
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
