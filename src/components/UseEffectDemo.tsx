import { useEffect, useState } from "react";
import HeadingWithAnchor from "./HeadingWithAnchor";

export default function ScreenSizeMonitorDemo() {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    console.log("Effect: Event listener added!");

    return () => {
      window.removeEventListener("resize", handleResize);
      console.log("Cleanup: Event listener removed!");
    };
  }, []);

  return (
    <div className="card">
      <HeadingWithAnchor id="useeffect-usestate-hooks" level={2}>useEffect and useState hooks</HeadingWithAnchor>
      <section>
        <p>
          Your current window width is: <strong>{windowWidth}px</strong>
        </p>
        {windowWidth < 600 ? (
          <p>📱 You are on a mobile view</p>
        ) : (
          <p>💻 You are on a desktop view</p>
        )}
      </section>
    </div>
  );
}