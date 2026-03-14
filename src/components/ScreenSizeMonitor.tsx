import React, { useEffect, useState } from 'react';

export default function ScreenSizeMonitor() {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    console.log('Effect: Event listener added!');

    return () => {
      window.removeEventListener('resize', handleResize);
      console.log('Cleanup: Event listener removed!');
    };
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h2>Screen Monitor</h2>
      <p>
        Your current window width is: <strong>{windowWidth}px</strong>
      </p>
      {windowWidth < 600 ? (
        <p>📱 You are on a mobile view</p>
      ) : (
        <p>💻 You are on a desktop view</p>
      )}
    </div>
  );
}
