- [x] **Project Structure & File Organization**
    - Feature-based folders vs type-based folders (`components/`, `hooks/`, `pages/`).
    - Co-locating styles, tests, and types next to their component.
    - Separating API helpers, hooks, contexts, and pages.
    - Environment variables with `.env` files and `import.meta.env`.

- [x] **Tailwind CSS Basics**
    - Utility-first CSS: compose styles directly in JSX with class names.
    - Responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`.
    - Dark mode with the `dark:` prefix.
    - Reusing styles: `@apply` in CSS or extracting components.
    - Custom config in `tailwind.config.ts` (colors, spacing, fonts).

- [x] **Controlled Components & Forms**
    - Controlled input: state is the source of truth, not the DOM.
    - Example: `<input value={name} onChange={(e) => setName(e.target.value)} />`
    - Uncontrolled inputs with `useRef` vs controlled inputs with `useState`.
    - Validation: inline messages, disabled submit, error states.
    - Debouncing input with `useEffect` + `setTimeout`.
    - Production alternative: React Hook Form library.

- [x] **Fetching Data (Async/Await, Fetch API, Axios)**
    - `async/await` syntax for readable async code.
    - Native `fetch` API: requests, headers, JSON parsing, AbortController.
    - Axios: third-party library with interceptors and automatic JSON parsing.
    - Loading and error states; `isLoading`, `isError` patterns.
    - TanStack Query (React Query): caching, background refetching, devtools.

- [x] **React Router (Navigation)**
    - `BrowserRouter`: Enables client-side routing; use `basename` for subpath deployments.
    - `Routes` & `Route`: Maps URLs to components.
    - `Link`: React-safe navigation without a full page refresh.
    - `useNavigate`: Programmatic navigation (e.g. redirect after form submit).
    - `useParams`: Read dynamic URL parameters (e.g. `/user/:id`).
    - Nested routes and shared layouts.

- [ ] **The Context API & Prop Drilling**
    - Prop drilling: passing data through many layers as props (the problem).
    - `createContext` + `Context.Provider`: create and provide global data.
    - `useContext`: consume context in any child component.
    - When to use context vs lifting state up vs a state library.
    - Performance: avoid unnecessary re-renders caused by context updates.

- [ ] **Component Composition & Reusability**
    - `children` prop for flexible wrapper components.
    - Passing components as props (render props pattern).
    - Compound components pattern (e.g. `<Select>` + `<Select.Option>`).
    - When to split a component into smaller ones.
    - Barrel files (`index.ts`) for cleaner imports.

- [ ] **Complex State: useReducer**
    - When `useState` becomes unwieldy (many related variables that change together).
    - `useReducer(reducer, initialState)` returns `[state, dispatch]`.
    - Actions: plain objects with a `type` field (e.g. `{ type: 'RESET_FORM' }`).
    - Reducer: a pure function that computes the next state from current state + action.
    - Foundation for understanding Redux and other global state tools.

- [ ] **Performance Hooks: useMemo & useCallback**
    - `useMemo`: memoizes an expensive computed value; recomputes only when dependencies change.
    - `useCallback`: memoizes a function reference to prevent unnecessary child re-renders.
    - Dependency arrays: same rules as `useEffect`.
    - Rule of thumb: profile first, optimize only when there is a measured problem.

- [ ] **Portals and Modals**
    - `React.createPortal`: renders a component into a different DOM node (e.g. `<body>`).
    - Common use cases: modals, tooltips, dropdowns that must escape parent clipping.
    - The component still lives in the React tree (events and context work normally).
    - Requires a mount point in `index.html` (e.g. `<div id="modal-root">`).

- [ ] **Error Handling in React**
    - `try/catch` in async functions for data-fetching errors.
    - Error boundaries: catch render errors in a subtree and show a fallback UI.
    - `react-error-boundary` library for a modern functional API.
    - Distinguishing user-facing error messages from internal error logging.

- [ ] **The Testing Stack (Vitest & Testing Library)**
    - Vitest: fast test runner built for Vite projects.
    - React Testing Library: render components and query by accessible role/text.
    - `userEvent`: simulate realistic user interactions (click, type, etc.).
    - Writing unit tests for components, custom hooks, and utility functions.
    - Mocking API calls and modules in tests.
