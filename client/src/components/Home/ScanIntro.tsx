import { useEffect, useState } from "react";
import "./ScanIntro.css";

export type ScanPhase = "hold" | "tease" | "pause" | "scan" | "done";

const SCAN_BLACK_MS = 500;
const SCAN_TEASE_MS = 1800;
const SCAN_HOLD_MS = 1000;
const SCAN_REVEAL_MS = 1300;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useScanIntroPhase(): ScanPhase {
  const [phase, setPhase] = useState<ScanPhase>(() =>
    typeof window !== "undefined" && prefersReducedMotion() ? "done" : "hold"
  );

  useEffect(() => {
    if (prefersReducedMotion()) {
      setPhase("done");
      return;
    }

    const timers: number[] = [];
    const later = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, ms));
    };

    setPhase("hold");

    later(SCAN_BLACK_MS, () => setPhase("tease"));
    later(SCAN_BLACK_MS + SCAN_TEASE_MS, () => setPhase("pause"));
    later(SCAN_BLACK_MS + SCAN_TEASE_MS + SCAN_HOLD_MS, () => setPhase("scan"));
    later(
      SCAN_BLACK_MS + SCAN_TEASE_MS + SCAN_HOLD_MS + SCAN_REVEAL_MS,
      () => setPhase("done")
    );

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return phase;
}

type ScanIntroOverlayProps = {
  phase: ScanPhase;
};

export function ScanIntroOverlay({ phase }: ScanIntroOverlayProps) {
  if (phase === "scan" || phase === "done") {
    return null;
  }

  return (
    <div className="scan-preamble" aria-hidden="true">
      <div className="preamble-tease">
        <div className="tease-prompt">[ &gt; ] boot</div>
        <div className="tease-name">
          Nicolás Sander
          <span className="caret" />
        </div>
        <div className="tease-rule" />
        <div className="tease-sub">~/portfolio</div>
      </div>
    </div>
  );
}

type ScanBeamProps = {
  phase: ScanPhase;
};

export function ScanBeam({ phase }: ScanBeamProps) {
  if (phase !== "scan") {
    return null;
  }

  return <div className="scan-beam" aria-hidden="true" />;
}

export function scanShellClassName(phase: ScanPhase): string {
  const classes = ["homepage-scan"];

  if (phase !== "done") {
    classes.push("is-intro");
  }

  if (phase === "hold" || phase === "tease" || phase === "pause") {
    classes.push("is-preamble");
  }

  if (phase === "hold") classes.push("phase-hold");
  if (phase === "tease") classes.push("phase-tease");
  if (phase === "pause") classes.push("phase-pause");
  if (phase === "scan") classes.push("phase-scan");
  if (phase === "done") classes.push("is-settled");

  return classes.join(" ");
}
