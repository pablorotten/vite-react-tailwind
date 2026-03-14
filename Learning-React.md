# Learning-React

https://nside.udemy.com/course/react-the-complete-guide-incl-redux/


- [Learning-React](#learning-react)
  - [React rendering workflow](#react-rendering-workflow)
    - [The complete workflow:](#the-complete-workflow)
  - [Component](#component)
    - [Props (properties)](#props-properties)
    - [Component composition](#component-composition)
    - [Fragment](#fragment)
    - [Events](#events)
      - [Functions with parameters](#functions-with-parameters)
  - [Styling](#styling)
    - [How to apply styles to a component](#how-to-apply-styles-to-a-component)
      - [Global CSS files (👎 not recommended for large apps)](#global-css-files--not-recommended-for-large-apps)
      - [CSS Modules (👍👍 recommended)](#css-modules--recommended)
      - [Inline styles / styled-components (👍 acceptable)](#inline-styles--styled-components--acceptable)
      - [Conditions in styled-components](#conditions-in-styled-components)
  - [Hooks](#hooks)
    - [useState()](#usestate)
    - [useRef()](#useref)
  - [Debugging react apps](#debugging-react-apps)
  - [Good practices](#good-practices)
    - [Import images and use them as variables:](#import-images-and-use-them-as-variables)
    - [Each `Component` should be in a separate file](#each-component-should-be-in-a-separate-file)


## React rendering workflow

The **entry point** is a simple `HTML` that loads an initial JSX file, `main.tsx`.

From that initial `main.tsx` we keep calling other components until we can render the whole page.

`index.html`
```html
<!doctype html>
<html lang="en">
  ...
  <body>
    <div id="root"></div>
    <script 
      type="module" 
      src="/src/main.tsx"
    ></script>
  </body>
</html>
```

`main.tsx`
```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

`Header.tsx`
```tsx
function Header() {

  return (
    <header>
      ...
    </header>
  );
}

export default Header;
```

`App.tsx`
```tsx
import React, { useState } from 'react';
import Header from './Header';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <main>
        ...
      </main>
    </>
  );
}

export default App;
```

### The complete workflow:
![alt text](images/react-workflow.png)

## Component

`Header.tsx`
```tsx
function Header() {

  return (
    <header>
      ...
    </header>
  );
}

export default Header;
```

A component is a JavaScript/TypeScript function that returns JSX.

- Starts with an uppercase name
- Returns renderable content
- Is reusable and composable

### Props (properties)

**Props** are parameters you can pass to components. By default, React provides all props on the `props` object:

```tsx
// MyComponent.tsx
function MyComponent(props) {
  return (
    <>
      <div>{props.prop1}</div>
      <div>{props.prop2}</div>
      <div>{props.prop3}</div>
    </>
  );
}

// App.tsx
  <MyComponent
    prop1="property 1"
    prop2="property 2"
    prop3="property 3"
  />
```

You can be more explicit using **object destructuring**. For example, this component has the props `image`, `title`, and `description`:

`CoreConcept.tsx`
```tsx
function CoreConcept({ image, title = 'default title', description }: { image: string; title?: string; description?: string }) {
  return (
    <li>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  );
}
```

Props can have default values.

Use props by passing parameters directly or by using the JS spread operator `...` when the data comes from an object (e.g., JSON):

`App.tsx`
```tsx
<ul>
  <CoreConcept
    title="title"
    description="description"
    image="image.png"
  />
  <CoreConcept {...CORE_CONCEPTS[0]} />
</ul>
```

### Component composition

When using a component, anything between `<Component>...</Component>` is provided to the component as `props.children`.

Useful to send text:
```tsx
// TabButton.tsx
export default function TabButton() {
  <button>
    {props.children}
  </button>
}

...
// App.tsx
<TabButton>Button text</TabButton>
```

Compatible with destructuring:
```tsx
// TabButton.tsx
export default function TabButton({ children }: { children?: React.ReactNode }) {
  return (
    <button>
      {children}
    </button>
  );
}
```

### Fragment

In a `Component`, you can't return 2 sibling elements:
```tsx
return (
  <h2>Welcome!</h2>
  <p>React is awesome!</p>
);
```

You could solve this by wrapping the elements in a `div`
```tsx
return (
  <div>
    <h2>Welcome!</h2>
    <p>React is awesome!</p>
  </div>
);
```

But maybe you don't want to add that extra element to the page 🙁

With "React Fragment" you can solve this!

```tsx
import { Fragment } from 'react';
 
// ... other code ...
 
return (
  <Fragment>
    <h2>Welcome!</h2>
    <p>React is awesome!</p>
  </Fragment>
);

```
Shorter form:

```tsx
// no import needed
 
return (
  <>
    <h2>Welcome!</h2>
    <p>React is awesome!</p>
  </>
);
```

### Events

Define a function in a component and pass it to the element via an event handler. The function's scope is the component where it's defined.

`TabButton.tsx`
```tsx
export default function TabButton({children}) {
  function handleClick() {
    console.log('Click!');
  }
  
  return (
    <li>
      <button onClick={handleClick}>{children}</button>
    </li>
  );
}
```

Pass the function as **prop** to the **component**. 

This pattern is useful because now the scope of `handleClick()` is `App.tsx` since the function is defined there. So it can modify the view there but is still used in `TabButton.tsx`.

`TabButton.tsx`
```tsx
export default function TabButton({children, onSelect}) {
  
  return (
    <li>
      <button onClick={onSelect}>{children}</button>
    </li>
  );
}
```
`App.tsx`
```tsx
function handleSelect() {
  console.log('passed function to Click!');
}

<ul>
  <TabButton onSelect={handleSelect}>Button Text</TabButton>
</ul>
```

#### Functions with parameters

The anonymous function we pass to the component can have parameters:

`App.tsx`
```tsx
function App() {

  function handleSelect(selectedButton: string) {
    console.log(selectedButton);
  }

  return (
    <menu>
      <TabButton onSelect={() => handleSelect('components')}>
        Components
      </TabButton>
      <TabButton onSelect={() => handleSelect('jsx')}>
        JSX
      </TabButton>
    </menu>
  );
}
```


## Styling

### How to apply styles to a component

#### Global CSS files (👎 not recommended for large apps)

Define the styles in a separate CSS file and import it in the component. 

* ✅ Easy to implement
* ❌ Styles are global and will be applied to the whole app, not just the component

**MyComponent.css**
```css
.red-label {
  color: red;
}
```

**MyComponent.tsx**
```tsx
import './MyComponent.css';

export default function MyComponent() {
  return (
    <label className="red-label">
      This text will be red
    </label>
  );
}
```

> [!WARNING]
> Remember that styles defined in a global CSS file will be applied to the whole app unless scoped (e.g., CSS Modules).
 
**MyOtherComponent.tsx**
```tsx
export default function MyOtherComponent() {
  return (
    <label className="red-label">
      This text will be red in ALL THE COMPONENTS because the styles are global
    </label>
  );
}
```


#### CSS Modules (👍👍 recommended)

Define the styles of a component in a file with the same name. Then import the styles as an object and use the properties of that object to apply the styles to the elements.

* ✅ Styles are scoped to the current component
* ✅ Styles are reusable and easy to maintain
* ✅ No runtime overhead because styles are generated at build time

> [!INFO]
> If your class has special characters like `-` you need to use square brackets to access it: `styles['my-class']` instead of `styles.my-class`. Prefer camelCase class names to use `styles.someClass`.

**MyComponent.module.css**
```css
.red-label {
  color: red;
}
```

**MyComponent.tsx**
```tsx
import styles from './MyComponent.module.css';

export default function MyComponent() {
  return (
    <label className={styles['red-label']}>
      This text will be red only in this component
    </label>
  );
}
```

#### Inline styles / styled-components (👍 acceptable)

Set style directly in a component or use a CSS-in-JS library such as styled-components.

* ✅ Styles scoped to the current component
* ✅ Compatible with conditional styles logic
* ❌ Adds runtime overhead in some libraries because styles are created at runtime
* ❌ Some approaches generate classnames that are harder to debug

**MyComponent.tsx**
```tsx
import styled from 'styled-components';

const RedLabel = styled.label`
  color: red;
`;

export default function MyComponent() {
  return (
    <RedLabel>
      This text will be red only in this component
    </RedLabel>
  );
}
```

#### Conditions in styled-components

Styled-components (and similar libraries) let you access props inside the styled definition to conditionally set styles. When passing non-DOM props to styled-components, it's a common convention to prefix transient props with `$` to avoid them being forwarded to the underlying DOM element.

Example:

```tsx
import styled from 'styled-components';

const Input = styled.input<{ $invalid?: boolean }>`
  color: ${({ $invalid }) => ($invalid ? '#ef4444' : '#374151')};
`;

const passwordNotValid = submitted && enteredPassword.trim().length < 6;

return (
  <Input $invalid={passwordNotValid} />
);
```

## Hooks

### useState()

To tell React that it has to re-render a component, we use the `useState()` hook.

The `useState()` hook returns two items: the current state and a setter function:

```tsx
const [currentStateValue, updatingFunction] = useState('initialValue');
```

A hook is a function that must be used at the top level of a component (no conditional or nested calls).

We pass the initial value to `useState(initialValue)` and it returns:
- `currentStateValue`: current state value that may change the next time the function is executed
- `updatingFunction()`: 
  - The function `updatingFunction()` accepts a value that will be assigned to `currentStateValue`, updating it
  - It can also accept another function whose result will be stored in `currentStateValue`.

> [!IMPORTANT]
> Using `updatingFunction()` and updating `currentStateValue` will trigger React to re-render the component if the state value changed.

Initially `count` is `0`. We pass a function to `setCount()` that takes `count` as parameter and adds one to it. Every time the user clicks on the button, it will add 1 to `count` and re-render the component:
```tsx
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((count) => count + 1)}>
      count is {count}
    </button>
  );
}
```

We can also use `setCount` inside a function and just pass the new value to it:

```tsx
function App() {
  const [selectedTopic, setSelectedTopic] = useState();

  function handleSelect(selectedButton: string) {
    setSelectedTopic(selectedButton);
  }

  return (
    <TabButton onSelect={() => handleSelect('components')}>
      Components
    </TabButton>
  );
}
```

### useRef()

The `useRef()` hook allows us to keep a mutable reference (for example, to a DOM element) that survives re-renders.

```tsx
import React, { useRef } from 'react';

export default function YourComponent() {
  // theReference will point to an input element and is initialized with `null`.
  const theReference = useRef<HTMLInputElement | null>(null);

  function focusReferencedInput() {
    theReference.current?.focus();
  }

  // ✅ Here is when we connect the pointer `theReference` to the Input element. 
  return (
    <>
      <input ref={theReference} />
      <button type="button" onClick={focusReferencedInput}>
        Focus Email
      </button>
    </>
  );
}
```


## Debugging react apps
- Find the sources in Chrome DevTools and put breakpoints where needed.
- In StrictMode (development), React intentionally mounts and unmounts components twice to help surface side-effects.
- React DevTools: Install the browser extension for inspecting component trees and hooks.

## Good practices

### Import images and use them as variables:
```tsx
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

...
<img src={viteLogo} className="logo" alt="Vite logo" />
```

### Each `Component` should be in a separate file

- File has same name as the component
- Components live under `src/components`. You can add subfolders as needed, adjusting import paths.
- Export the component to make it accessible to other files.
```tsx
// In src/components/YourComponent.tsx
import reactLogo from '../assets/react.svg'; // adapt url to ../assets

export default function YourComponent() { return <div /> }
// In App.tsx
import Header from './components/YourComponent.tsx';
```
- Style files (CSS) related to a component are typically colocated next to it using the same base name.
  - ❗Styles defined in a global CSS file will affect the whole app unless you scope them with CSS Modules.

![alt text](image.png)

Import and use it:
```tsx
import './Header.css'

export default function Header() { return <header /> }
```

- Functions received as props that are event handlers should start with `on` (e.g., `onClick`, `onSelect`).

```tsx
export default function TabButton({ children, onSelect }: { children?: React.ReactNode; onSelect?: () => void }) {
  return (
    <li>
      <button onClick={onSelect}>{children}</button>
    </li>
  );
}
```

Note: when rendering lists, always provide a unique `key` prop for each item to help React optimize rendering.

Useful links:

- React Hooks: https://reactjs.org/docs/hooks-intro.html
- React Fragments: https://reactjs.org/docs/fragments.html
