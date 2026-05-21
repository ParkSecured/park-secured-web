import { useEffect, useState } from "react";

export default function ClockCard() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="clock-card">
      <span>Ora curenta</span>
      <strong>
        {new Intl.DateTimeFormat("ro-RO", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(now)}
      </strong>
    </div>
  );
}
