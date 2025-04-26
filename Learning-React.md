# Learning-React

https://nside.udemy.com/course/react-the-complete-guide-incl-redux/


## 1. React rendering and components

The **entry point** is a simple `html` that calls a first `JSX` file, `main.tsx`.

From that inital `main.tsx` we keep calling other components until we can render the whole page.


Component is a **JSX** function that

- Starts in Upper case
- Returns renderable content

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