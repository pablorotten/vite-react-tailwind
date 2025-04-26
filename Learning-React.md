# Learning-React

https://nside.udemy.com/course/react-the-complete-guide-incl-redux/


## 1. React rendering workflow

The **entry point** is a simple `html` that calls a first `JSX` file, `main.tsx`.

From that inital `main.tsx` we keep calling other components until we can render the whole page.

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

## 2. Concepts

### Component

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

#### Component composition

When using a components, anything inside the declaration `<Component> Here! <Component/>` is send to the Component constructor in the **prop** `props.children`

Usefull to send text:
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

## 3. Events

Define a function in a **component** and use it in the return statement.
Remember that the scope of the function `handleClick()` is restricted to `TabButton.tsx`. 

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

### Functions with parameters

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
- Export the component to make them accesible for other components 
```tsx
// In src/components/YourComponent.tsx
import reactLogo from "../assets/react.svg"; // adapt url to ../assets

export default function YourComponent() { ... }
...
// In App.tsx
import Header from "./components/YourComponent.tsx";
```
- Style files (CSS) related to a component are next to it using the same name
  - ❗Styles defined in a CSS component **will be applyied to the whole App!!**

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