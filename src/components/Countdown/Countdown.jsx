import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";

function getTimeLeft(targetDate) {
  const distance = Math.max(new Date(targetDate).getTime() - Date.now(), 0);
  return {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60),
    seconds: Math.floor((distance / 1000) % 60),
    complete: distance === 0
  };
}

export default function Countdown({ targetDate, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));
  const firedRef = useRef(false);
  const units = useMemo(() => ["days", "hours", "minutes", "seconds"], []);

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => window.clearInterval(timer);
  }, [targetDate]);

  useEffect(() => {
    if (!timeLeft.complete || firedRef.current) return;
    firedRef.current = true;
    confetti({ particleCount: 240, spread: 110, origin: { y: 0.65 } });
    onComplete();
  }, [onComplete, timeLeft.complete]);

  return (
    <section className="section-panel reveal">
      <p className="eyebrow">Birthday countdown</p>
      <h2>{timeLeft.complete ? "The day is here." : "Counting every golden second."}</h2>
      <div className="countdown-grid">
        {units.map((unit) => (
          <article className="glass-tile" key={unit}>
            <strong>{String(timeLeft[unit]).padStart(2, "0")}</strong>
            <span>{unit}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
