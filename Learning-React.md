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
    - [How apply styles to a component](#how-apply-styles-to-a-component)
      - [CSS Components (👎 not recommended)](#css-components--not-recommended)
      - [CSS Modules (👍👍 best option)](#css-modules--best-option)
      - [Inline styles (👍 acceptable)](#inline-styles--acceptable)
      - [Conditions in styled components](#conditions-in-styled-components)
  - [Hooks](#hooks)
    - [useState()](#usestate)
    - [useRef()](#useref)
  - [Debugging react apps](#debugging-react-apps)
  - [Good practices](#good-practices)
    - [Import images as and use them as variables:](#import-images-as-and-use-them-as-variables)
    - [Each `Component` must be in a separate file](#each-component-must-be-in-a-separate-file)


## React rendering workflow

The **entry point** is a simple `html` that calls a first `JSX` file, `main.tsx`.

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
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
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
```jsx
import Header from "./Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <main>
        ...
        </div>
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

Component is a **JSX** function that

- Starts in Upper case
- Returns renderable content
- They're reusable

### Props (properties)

**Props** are parameters you can pass to **Components** constructor. By default, react puts all the **props** are inside the `props` object:

```tsx
// MyComponent.tsx
function MyComponent(props) {
  return (
    <div>{props.prop1}</div>
    <div>{props.prop2}</div>
    <div>{props.prop3}</div>
  );
}

...

// App.tsx
  <MyComponent
    prop1="property 1"
    prop2="property 2"
    prop3="property 3"
  />
```

You can be more explicit using **object destructuring**. For example, this component has the props `image`, `title` and `description`:

`CoreConcept.tsx`
```tsx
function CoreConcept({image, title = "default title", description}) {
  return (
    <li>
      <img src={image} alt={title}/>
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  );
}
```
Pros can have default values

Use it directly passing the parameters or using JS spread operator `...Array` if you have the data in Json format

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

When using a components, anything inside the declaration `<Component> Here! <Component/>` is send to the Component constructor in the **prop** `props.children`.

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

Compatible with deconstruction
```tsx
// TabButton.tsx
export default function TabButton({children}) {
  <button>
    {children}
  </button>
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

Define a function in a **Component** and use it in the return statement.
Remember that the scope of the function `handleClick()` is restricted to `TabButton.tsx` component. 

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

  function handleSelect(selectedButton) {
    console.log(selectedButton);
  }

...
return (
  ...

  <menu>
    <TabButton onSelect={() => handleSelect('components')}>
      Components
    </TabButton>
    <TabButton onSelect={() => handleSelect('jsx')}>
      JSX
    </TabButton>
  ...
)
```


## Styling

### How apply styles to a component

#### CSS Components (👎 not recommended)

Define the styles in a separate CSS file and import it in the component. 

* ✅ Easy to implement
* ❌ Styles are global and will be applied to the whole App, not just the component

**MyComponent.css**
```css
.red-label {
  color: red;
}
```

**MyComponent.tsx**
```tsx
import "./MyComponent.css";
...
export default function MyComponent() {
  return (
    <label className="red-label">
      This text will be red
    </label>
  );
}
```

> [!WARNING]  
> Remember that styles defined in a CSS component **will be applied to the whole App!!**
 
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


#### CSS Modules (👍👍 best option)

Define the styles of a Component in a file with the same name. Then import the styles as an object and use the properties of that object to apply the styles to the elements.

* ✅ Styles are scoped to the current component
* ✅ Styles are reusable and easy to maintain
* ✅ No runtime overhead because styles are generated at build time

> [!INFO]
> If your class has special characters like `-` you need to use square brackets to access it: `styles['my-class']` instead of `styles.my-class`

**MyComponent.module.css**
```css
.red-label {
  color: red;
}
```

**MyComponent.tsx**
```tsx
import styles from "./MyComponent.module.css";
...
export default function MyComponent() {
  return (
    <label className={styles['red-label']}>
      This text will be red only in this component
    </label>
  );
}
```

#### Inline styles (👍 acceptable)

Set style directly in a `Component.tsx` code

* ✅ Styles scoped to the current component
* ✅ Compatible with conditional styles logic
* ❌ Adds runtime overhead because styles are created on every render
* ❌ Generates classnames that are hard to debug

**MyComponent.tsx**
```tsx
import { styled } from 'styled-components';
...
const RedLabel = styled.label`
  color: red;
`;
...
export default function MyComponent() {
  return (
    <RedLabel>
      This text will be red only in this component
    </RedLabel>
  );
}
```

#### Conditions in styled components

All the properties defined inside a Styled component are accesible from the component itself. This can be used to define conditions. Those properties needs a `$` before the name

For example here:
1. Input is used with the property `$invalid`
2. `$invalid` value depends on the function `passwordNotValid`
3. We use `$invalid` value as condition for the color

```ts
const Input = styled.input`
  color: ${({ $invalid }) => ($invalid ? '#ef4444' : '#374151')};
`;
const passwordNotValid = submitted && enteredPassword.trim().length < 6;

return (
  ...
  <Input $invalid={passwordNotValid}/>

```

## Hooks

### useState()

To tell React that it has to re-render a Component, we need to use the hook `useState()`. 

The `useState()` hook returns 2 elements: current state and setter function:

```tsx
const [currentStateValue, updatingFunction] = useState('initialValue');
```

A hook is a function that must be used at top level of a `Component`.

We pass the initial value to `useState(initialValue)` and it returns:
- `currentStateValue`: current state value that may change next time the function is executed
- `updatingFunction()`: 
  - The function `updatingFunction()` accepts a value that will be assigned to `currentStateValue` updating it
  - It can also accept **another** function whose result will be stored in  `currentStateValue` updating its value.

> [!IMPORTANT]
> Using `updatingFunction()` and updating `currentStateValue` will trigger React to **render again the Component**
> If `currentStateValue` is used in the view, it will be rendered with the updated value

Initially count is `0`. We pass a function to `setCount()` that takes `count` as parameter and adds one to it. Every time user clicks on button, it will add 1 to count and re-render the component:
```tsx
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    ...
    <button onClick={() => setCount((count) => count + 1)}>
      count is {count}
    </button>
    ...
  )
```

We can also use setCount inside a function and just pass the new value to it:

```tsx
function App() {
  const [selectedTopic, setSelectedTopic] = useState();

  function handleSelect(selectedButton) {
    setSelectedTopic(selectedButton);
  }

  ...
  return (
    ...
    <TabButton onSelect={() => handleSelect('components')}>
      Components
    </TabButton>
```

### useRef()

The hook `useRef()` allows us to get a reference to an element in the DOM and manipulate it directly.

```tsx
import { useRef } from "react";
...

export default function YourComponent() {
  // theReference will point to an Input. It's initialized with `null`
  const theReference = useRef<HTMLInputElement>(null);

  // function to focus the referenced Input. Might be null (?)
  function focusReferencedInput() {
    theReference.current?.focus();
  }

  // ✅ Here is when we connect the pointer `theReference` to the Input element. 
  return (
    ...
    <Input
      ref={theReference}
      ...
    />
    ...
    // Finally, a button to call the function that triggers the Input focus
    <button type="button" className="text-button" onClick={focusReferencedInput}>
      Focus Email
    </button>
```



## Debugging react apps
- Find the sources in chrome dev tools and put breakpoint
- StrictMode every component is executed twice
- ReactDevTools: Install the extension

## Good practices

### Import images as and use them as variables:
```tsx
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

...
<img src={viteLogo} className="logo" alt="Vite logo" />
```

### Each `Component` must be in a separate file

- File has same name as **Component**
- **Components** are under `src/components` folder. You can add as many subfolder as you want but remember to adapt the paths
- Export the component to make them accessible for other components 
```tsx
// In src/components/YourComponent.tsx
import reactLogo from "../assets/react.svg"; // adapt url to ../assets

export default function YourComponent() { ... }
...
// In App.tsx
import Header from "./components/YourComponent.tsx";
```
- Style files (CSS) related to a component are next to it using the same name
  - ❗Styles defined in a CSS component **will be applied to the whole App!!**

![alt text](image.png)

Import and use it:
```tsx
import "./Header.css"

export default function Header() { ... }
```

- Functions received as props in component must start with `on`
```tsx
export default function TabButton({children, onSelect, onClick, ...}) {
```