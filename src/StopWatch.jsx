// Stopwatch.jsx
import { useState, useRef, useEffect } from "react";

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);

  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
}

export default function Stopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(null);

  const start = () => {
    if (isRunning) return;
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsed;

    intervalIdRef.current = setInterval(() => {
      setElapsed(Date.now() - startTimeRef.current);
    }, 10);
  };

  const stop = () => {
    if (!isRunning) return;
    setIsRunning(false);
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;
  };

  const reset = () => {
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;
    setIsRunning(false);
    setElapsed(0);
    startTimeRef.current = null;
  };

  useEffect(() => {
    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 16 }}>
      <h1>Stopwatch</h1>
      <div style={{ fontSize: 32, fontVariantNumeric: "tabular-nums" }}>
        {formatTime(elapsed)}
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button onClick={isRunning ? stop : start}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button onClick={reset} disabled={isRunning || elapsed === 0}>
          Reset
        </button>
      </div>
    </div>
  );
}
