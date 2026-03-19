import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import User from "./pages/User";

export default function App() {
  return (
    <>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/about"
            element={<About info="This prop came from the Route element in App.tsx" />}
          />
          <Route path="/user/:email/:name" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
