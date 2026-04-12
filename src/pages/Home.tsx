import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import AuthInputs from "../components/AuthInputs";
import Nationalize from "../components/Nationalize";
import ScreenSizeMonitor from "../components/ScreenSizeMonitor";
import FlexibleCardPresenter from "../components/FlexibleCardPresenter";
import FlexibleCard from "../components/FlexibleCard";
import "../App.css";

export default function Home() {
  const [count, setCount] = useState(0);
  const [isEven, setIsEven] = useState(false);
  const navigate = useNavigate();
  const [running, setRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const timerRef = useRef<number | null>(null);

  function handleCount() {
    setCount((count) => count + 1);
    handleIsEven();
  }

  function handleIsEven() {
    setIsEven(count % 2 === 0);
  }

  useEffect(() => {
    if (!running) return;
    setSecondsLeft(5);
    
    // setInterval returns a number (the timer ID) to identify this interval and be able to stop it
    timerRef.current = window.setInterval(() => {
      setSecondsLeft((s) => {
        // if 5 seconds have passed
        if (s <= 1) {
          // Double check timeRef is not null (it shouldn't be, but just in case)
          if (timerRef.current) {
            // kill the timer
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          // stop the countdown and navigate to the target page
          setRunning(false);
          navigate("/target");
          return 0;
        }
        // if there are still seconds left, decrease the count
        return s - 1;
      });
    }, 1000);

    return () => {
      // kill the counter if component unmount (e.g., user navigates away or clicks "Cancel" button)
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [running, navigate]);

  return (
    <>
      <Header />
      <main>
        <div className="card">
          {!running ? (
            <button
              onClick={() => setRunning(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Start 5s redirect
            </button>
          ) : (
            <>
              <p>Navigating in {secondsLeft} second{secondsLeft !== 1 ? "s" : ""}…</p>
              <div className="mt-2">
                <button
                  onClick={() => {
                    if (timerRef.current) {
                      clearInterval(timerRef.current);
                      timerRef.current = null;
                    }
                    setRunning(false);
                  }}
                  className="px-3 py-1 bg-gray-300 rounded mr-2"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
        <div className="card">
          <button
            onClick={handleCount}
            className={`clear-button ${isEven ? "even" : "odd"}`}
          >
            count is {count}
          </button>
        </div>
        <p className="read-the-docs"></p>

        <div className="card">
          <AuthInputs />
        </div>
        <div className="card">
          <Nationalize />
        </div>
        <div className="card">
          <h2 className="text-xl font-bold mb-2">Component Composition & Reusability</h2>
          <p className="mb-3 text-sm text-gray-600">
            The <code>children</code> prop lets you pass arbitrary JSX into a
            wrapper component so it can render whatever you give it. Below are
            three examples showing how the same wrapper can be reused.
          </p>

          <div className="space-y-3">
            <FlexibleCard title="Basic wrapper">
              <p>This is a simple use of <code>children</code> — plain text.</p>
            </FlexibleCard>

            <FlexibleCard title="Nested components">
              <AuthInputs />
            </FlexibleCard>

            <FlexibleCard
              title="With footer and custom class"
              footer={<button className="px-3 py-1 bg-indigo-600 text-white rounded">Action</button>}
              className="border-l-4 border-indigo-200"
            >
              <p>
                You can pass any JSX as children — even other components — and
                combine them with props like <code>footer</code>.
              </p>
            </FlexibleCard>
            {/* Presenter-first FlexibleCard example for comparison */}
            <FlexibleCardPresenter
              render={({ title, content, footer }) => (
                <FlexibleCard title={title} footer={footer}>
                  {content}
                </FlexibleCard>
              )}
            />
          </div>
        </div>
        <div className="card">
          <ScreenSizeMonitor />
        </div>
      </main>
    </>
  );
}
