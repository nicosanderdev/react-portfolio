import { useEffect, useRef } from "react";
import "./ConsolePulse.css";

// --- Helper function for random values ---
const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const ConsolePulse = () => {
  // --- Refs for Canvas and Animation ---
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dataRef = useRef<number[]>([]);
  const animationFrameId = useRef(0);
  const lastUpdateRef = useRef(0);

  // --- Refs for DOM elements to avoid getElementById ---
  const light1Ref = useRef<HTMLDivElement>(null);
  const light2Ref = useRef<HTMLDivElement>(null);
  const light3Ref = useRef<HTMLDivElement>(null);
  const square1Ref = useRef<HTMLDivElement>(null);
  const square2Ref = useRef<HTMLDivElement>(null);
  const bar1Ref = useRef<HTMLDivElement>(null);
  const bar2Ref = useRef<HTMLDivElement>(null);


  // --- Date Formatting ---
  const today = new Date();
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const formattedDate = `DATE ${days[today.getDay()]}-${String(today.getDate()).padStart(2, '0')}-${months[today.getMonth()]}-${String(today.getFullYear()).slice(-2)}`;

  // --- Effect for Canvas Pulse Animation ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // --- Configuration Constants ---
    const width = 450;
    const height = 150;
    const dpr = window.devicePixelRatio || 1;
    const spacing = 2;
    const amplitude = 45;
    const updateDelay = 30;

    // Set up canvas for high DPI displays
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    
    // --- KEY FIX: Initialize with random data for an instant start ---
    dataRef.current = Array.from({ length: Math.floor(width / spacing) }, () => 
      height / 2 + getRandom(-amplitude, amplitude)
    );

    const drawPulse = (timestamp: number) => {
      // Throttle updates to control animation speed
      if (timestamp - lastUpdateRef.current > updateDelay) {
        const newPoint = height / 2 + getRandom(-amplitude, amplitude);
        dataRef.current.push(newPoint); // Add new point to the end
        dataRef.current.shift();       // Remove the oldest point from the start
        lastUpdateRef.current = timestamp;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      
      // Use the first point as the starting point
      ctx.moveTo(0, dataRef.current[0]);

      // Draw lines to all subsequent points
      for (let i = 1; i < dataRef.current.length; i++) {
        ctx.lineTo(i * spacing, dataRef.current[i]);
      }

      ctx.strokeStyle = "#34d399";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animationFrameId.current = requestAnimationFrame(drawPulse);
    };

    animationFrameId.current = requestAnimationFrame(drawPulse);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []); // Empty dependency array ensures this runs only once

  // --- Effect for Blinking Lights & Bars (React-idiomatic way) ---
  useEffect(() => {
    const updateBars = () => {
      if (bar1Ref.current) bar1Ref.current.style.height = `${getRandom(5, 95)}%`;
      if (bar2Ref.current) bar2Ref.current.style.height = `${getRandom(5, 95)}%`;
    };

    const blinkElements = () => {
      const lights = [light1Ref.current, light2Ref.current, light3Ref.current];
      const squares = [square1Ref.current, square2Ref.current];
      
      const blink = (el: HTMLDivElement | null) => {
        if (el) el.style.background = Math.random() > 0.5 ? "#34d399" : "";
      };

      lights.forEach(blink);
      squares.forEach(blink);
    };

    const barsInterval = setInterval(updateBars, 300);
    const blinkInterval = setInterval(blinkElements, 500);
    
    // Initial calls to avoid waiting for the first interval
    updateBars();
    blinkElements();

    return () => {
      clearInterval(barsInterval);
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <div className="box flex flex-row">
      <div className="flex flex-col">
        <div className="console-box">
          <div className="pulse-graph">
            <canvas ref={canvasRef}></canvas>
          </div>
        </div>
        <div className="lights">
          {/* Assign refs to elements */}
          <div className="light" ref={light1Ref}></div>
          <div className="light" ref={light2Ref}></div>
          <div><span>PBZ</span></div>
          <div className="light" ref={light3Ref}></div>
          <div><span>RIV</span></div>
          <div className="squares">
            <div className="square mb-1" ref={square1Ref}></div>
            <div className="square" ref={square2Ref}></div>
          </div>
          <div>{formattedDate}</div>
        </div>
      </div>
      <div className="side-bars">
        <div className="bar" ref={bar1Ref}></div>
        <div className="bar" ref={bar2Ref}></div>
      </div>
    </div>
  );
};

export default ConsolePulse;