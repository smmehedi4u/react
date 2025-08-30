import React, { useEffect, useMemo, useState } from "react";

// Digital Clock Component
// - 12/24h toggle
// - Show/Hide seconds
// - Timezone selector (auto-detect, with fallback list)
// - Date display
// - Clean Tailwind styling

function formatTime(date, { hour12, showSeconds, timeZone }) {
  const opts = {
    hour: "2-digit",
    minute: "2-digit",
    ...(showSeconds ? { second: "2-digit" } : {}),
    hour12,
    timeZone,
  };
  const parts = new Intl.DateTimeFormat([], opts).formatToParts(date);

  const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    hour: get("hour"),
    minute: get("minute"),
    second: get("second"),
    dayPeriod: get("dayPeriod")?.toUpperCase() ?? "",
    literal: parts.find((p) => p.type === "literal")?.value ?? ":",
  };
}

function useNow(tz) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [tz]);
  return now;
}

function getSupportedTimeZones() {
  if (typeof Intl.supportedValuesOf === "function") {
    try {
      return Intl.supportedValuesOf("timeZone");
    } catch {}
  }
  return [
    "UTC",
    "Europe/London",
    "Europe/Paris",
    "Africa/Cairo",
    "Asia/Dhaka",
    "Asia/Dubai",
    "Asia/Tokyo",
    "Asia/Singapore",
    "Asia/Kolkata",
    "Australia/Sydney",
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
  ];
}

export default function App() {
  const defaultTZ = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    []
  );
  const [timeZone, setTimeZone] = useState(defaultTZ);
  const [hour12, setHour12] = useState(true);
  const [showSeconds, setShowSeconds] = useState(true);

  const now = useNow(timeZone);
  const { hour, minute, second, dayPeriod, literal } = formatTime(now, {
    hour12,
    showSeconds,
    timeZone,
  });

  const dateStr = new Intl.DateTimeFormat([], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
    timeZone,
  }).format(now);

  const zones = useMemo(() => getSupportedTimeZones(), []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black p-6">
      <div className="w-full max-w-3xl">
        <div className="rounded-2xl shadow-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
              Digital Clock
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <label className="inline-flex items-center gap-2 text-sm text-slate-200 bg-white/10 rounded-xl px-3 py-2">
                <input
                  type="checkbox"
                  checked={hour12}
                  onChange={(e) => setHour12(e.target.checked)}
                  className="accent-white"
                />
                12‑hour
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-slate-200 bg-white/10 rounded-xl px-3 py-2">
                <input
                  type="checkbox"
                  checked={showSeconds}
                  onChange={(e) => setShowSeconds(e.target.checked)}
                  className="accent-white"
                />
                Show seconds
              </label>
              <select
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                className="text-sm bg-white/10 text-slate-100 rounded-xl px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                title="Choose timezone"
              >
                {zones.map((z) => (
                  <option
                    key={z}
                    value={z}
                    className="bg-slate-900 text-slate-100"
                  >
                    {z}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="font-mono text-[12vw] md:text-7xl lg:text-8xl font-bold text-white tracking-widest leading-none select-none">
              <ClockDigits
                hour={hour}
                minute={minute}
                second={second}
                literal={literal}
                showSeconds={showSeconds}
              />
            </div>

            <div className="text-slate-300 text-base md:text-lg font-medium">
              {dateStr}
              {hour12 && (
                <span className="ml-2 inline-flex items-center text-slate-400 text-sm align-top">
                  {dayPeriod}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-slate-400">
          Tip: Toggle 12‑hour/seconds or pick another timezone.
        </div>
      </div>
    </div>
  );
}

function ClockDigits({ hour, minute, second, literal, showSeconds }) {
  return (
    <div className="flex items-baseline gap-4">
      <Segment value={hour} />
      <BlinkingColon char={literal} />
      <Segment value={minute} />
      {showSeconds && (
        <>
          <BlinkingColon char={literal} />
          <Segment value={second} dim />
        </>
      )}
    </div>
  );
}

function Segment({ value, dim = false }) {
  return (
    <span className={"tabular-nums " + (dim ? "text-white/70" : "text-white")}>
      {value}
    </span>
  );
}

function BlinkingColon({ char = ":" }) {
  return (
    <span
      className="tabular-nums animate-pulse"
      aria-hidden
      style={{ animationDuration: "1s" }}
    >
      {char}
    </span>
  );
}
