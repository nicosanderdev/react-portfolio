import { useEffect, useState } from "react";

interface LoadingBarBatteryProps {
  onFinish: () => void;
}

export default function LoadingBarBattery({ onFinish }: LoadingBarBatteryProps) {
  const [filledCount, setFilledCount] = useState<number>(0);
  const totalBars = 8;

  useEffect(() => {
    const interval = setInterval(() => {
      setFilledCount((prev) => {
        if (prev >= totalBars) {
          clearInterval(interval);
          setTimeout(() => onFinish(), 500); // Small delay after full
          return totalBars;
        }
        return prev + 1;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="w-full flex-col justify-center items-center h-50 z-50">
      <div className="flex gap-[2px] border-2 p-[3px] h-22 w-fit mx-auto">
        {Array.from({ length: totalBars }).map((_, index) => (
          <div
            key={index}
            className={`w-6 h-20 transition-all duration-50 ${
              index < filledCount ? "bg-emerald-400" : ""
            }`}
          />
        ))}
      </div>
      <div className="pt-2">
        <span className="text-base font-mono">Loading...</span>
      </div>
    </div>
  );
}