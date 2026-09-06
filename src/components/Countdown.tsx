import { useEffect, useState } from "react";

const END = Date.now() + 1000 * 60 * 60 * 24 * 18 + 1000 * 60 * 47;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function Countdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, END - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  const cells = [
    [pad(days), "Days"],
    [pad(hours), "Hr"],
    [pad(mins), "Mins"],
    [pad(secs), "Sec"],
  ];
  return (
    <div className="mt-6 flex gap-3">
      {cells.map(([v, l]) => (
        <div key={l} className="grid h-[72px] w-[72px] place-items-center rounded-xl bg-black text-white">
          <div className="text-center">
            <div className="text-lg font-semibold leading-none">{v}</div>
            <div className="mt-1 text-[11px] text-white/70">{l}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
