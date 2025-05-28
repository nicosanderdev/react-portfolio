import { useEffect, useRef } from "react";
import "./ConsolePulse.css";

const ConsolePulse = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dataRef = useRef<any[]>([]);
  const requestRef = useRef(0);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const width = 500;
    const height = 150;
    const dpr = 0.7;

    ctx.lineWidth = 1;
    ctx.translate(0.5, 0.5);

    canvas.height = 150;

    const spacing = 7;
    canvas.width = 500 / spacing;

    // Set up canvas for high DPI
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    dataRef.current = Array(width).fill(height / 2);

    function drawPulse(timestamp: number) {
      const delay = 40; // ms between updates
      if (timestamp - lastUpdateRef.current > delay) {
        const spike = height / 2 + (Math.random() - 0.5) * 90;
        dataRef.current.push(spike);
        dataRef.current.shift();
        lastUpdateRef.current = timestamp;
      }
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.moveTo(0, dataRef.current[0]);

      for (let i = 1; i < dataRef.current.length; i++) {
        ctx.lineTo(i * spacing, dataRef.current[i]);
      }

      ctx.strokeStyle = "#34d399";
      ctx.lineWidth = 1;
      ctx.stroke();

      requestRef.current = requestAnimationFrame(drawPulse);
    }

    requestRef.current = requestAnimationFrame(drawPulse);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  useEffect(() => {
    const updateBars = () => {
      const bar1 = document.getElementById("bar1");
      const bar2 = document.getElementById("bar2");

      if (bar1 && bar2) {
        bar1.style.height = Math.floor(Math.random() * 100) + "px";
        bar2.style.height = Math.floor(Math.random() * 100) + "px";
      }
    };

    const blinkLights = () => {
      for (let i = 1; i <= 3; i++) {
        const light = document.getElementById("light" + i);
        if (light) {
          light.style.background = Math.random() > 0.5 ? "#34d399" : "#111827";
        }
      }
    };

    const barsInterval = setInterval(updateBars, 300);
    const lightsInterval = setInterval(blinkLights, 500);

    return () => {
      clearInterval(barsInterval);
      clearInterval(lightsInterval);
    };
  }, []);

  return (
    <>
      <div className="box w-full flex flex-row">
        <div className="flex flex-col">
          <div className="console-box">
            <div className="pulse-graph">
              <canvas ref={canvasRef}></canvas>
            </div>
          </div>
          <div className="lights">
            <div className="light" id="light1"></div>
            <div className="light" id="light2"></div>
            <div className="light" id="light3"></div>
          </div>
        </div>
        <div className="side-bars">
          <div className="bar" id="bar1"></div>
          <div className="bar" id="bar2"></div>
        </div>
      </div>
    </>
  );
};

export default ConsolePulse;
