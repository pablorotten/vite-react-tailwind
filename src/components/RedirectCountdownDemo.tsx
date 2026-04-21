import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeadingWithAnchor from "./HeadingWithAnchor";

export default function RedirectCountdownDemo() {
  const navigate = useNavigate();
  const [running, setRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    setSecondsLeft(5);

    timerRef.current = window.setInterval(() => {
      setSecondsLeft((seconds) => {
        if (seconds <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }

          setRunning(false);
          navigate("/target");
          return 0;
        }

        return seconds - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [running, navigate]);

  function handleCancel() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setRunning(false);
  }

  return (
    <div className="card">
      <HeadingWithAnchor id="usenavigate-example" level={2}>useNavigate() example</HeadingWithAnchor>
      {!running ? (
        <button
          onClick={() => setRunning(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded primary-button"
        >
          Start 5s redirect
        </button>
      ) : (
        <>
          <p>
            Navigating in {secondsLeft} second{secondsLeft !== 1 ? "s" : ""}…
          </p>
          <div className="mt-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-300 rounded mr-2"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}
