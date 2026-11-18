import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./ScanIntro.css";

export type ScanPhase = "hold" | "tease" | "pause" | "gate" | "scan" | "done";

const SCAN_BLACK_MS = 500;
const SCAN_TEASE_MS = 1800;
const SCAN_REVEAL_MS = 1300;
const CLOSE_CHECK_MS = 200;

export type ScanIntro = {
  phase: ScanPhase;
  closeBlocked: boolean;
  confirm: () => void;
  decline: () => void;
};

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useScanIntroPhase(): ScanIntro {
  const reducedAtStart =
    typeof window !== "undefined" && prefersReducedMotion();
  const [phase, setPhase] = useState<ScanPhase>(reducedAtStart ? "gate" : "hold");
  const [closeBlocked, setCloseBlocked] = useState(false);
  const timers = useRef<number[]>([]);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setPhase("gate");
      return;
    }

    const local: number[] = [];
    const schedule = (ms: number, fn: () => void) => {
      local.push(window.setTimeout(fn, ms));
    };

    setPhase("hold");
    schedule(SCAN_BLACK_MS, () => setPhase("tease"));
    schedule(SCAN_BLACK_MS + SCAN_TEASE_MS, () => setPhase("gate"));

    return () => {
      local.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  function confirm() {
    if (phaseRef.current !== "gate") return;
    setCloseBlocked(false);
    if (prefersReducedMotion()) {
      setPhase("done");
      return;
    }
    setPhase("scan");
    timers.current.push(window.setTimeout(() => setPhase("done"), SCAN_REVEAL_MS));
  }

  function decline() {
    if (phaseRef.current !== "gate") return;
    window.close();
    timers.current.push(
      window.setTimeout(() => {
        if (phaseRef.current === "gate") setCloseBlocked(true);
      }, CLOSE_CHECK_MS)
    );
  }

  return { phase, closeBlocked, confirm, decline };
}

type GateChoice = "yes" | "no";

type GatePromptProps = {
  closeBlocked: boolean;
  onConfirm: () => void;
  onDecline: () => void;
};

function GatePrompt({ closeBlocked, onConfirm, onDecline }: GatePromptProps) {
  const { t } = useTranslation();
  const [choice, setChoice] = useState<GateChoice>("yes");
  const rootRef = useRef<HTMLDivElement>(null);
  const choiceRef = useRef(choice);
  const confirmRef = useRef(onConfirm);
  const declineRef = useRef(onDecline);
  choiceRef.current = choice;
  confirmRef.current = onConfirm;
  declineRef.current = onDecline;

  useEffect(() => {
    rootRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        setChoice((current) => (current === "yes" ? "no" : "yes"));
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        if (choiceRef.current === "yes") confirmRef.current();
        else declineRef.current();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const options: { id: GateChoice; label: string; run: () => void }[] = [
    { id: "yes", label: t("gate_yes"), run: onConfirm },
    { id: "no", label: t("gate_no"), run: onDecline },
  ];

  return (
    <div
      ref={rootRef}
      className="gate-window"
      role="dialog"
      aria-labelledby="gate-prompt"
      tabIndex={-1}
      onMouseDown={(event) => event.preventDefault()}
    >
      <div className="gate-bar">
        <span className="gate-marks" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="gate-title" id="gate-prompt">
          {t("gate_prompt")}
        </span>
      </div>
      <div className="gate-body" role="listbox" aria-activedescendant={`gate-opt-${choice}`}>
        {options.map((option) => {
          const selected = option.id === choice;
          return (
            <div
              key={option.id}
              id={`gate-opt-${option.id}`}
              role="option"
              aria-selected={selected}
              className={`gate-option${selected ? " is-selected" : ""}`}
              onMouseEnter={() => setChoice(option.id)}
              onClick={option.run}
            >
              <span className="gate-chevron" aria-hidden="true">
                {selected ? "[>]" : ""}
              </span>
              <span>{option.label}</span>
            </div>
          );
        })}
        {closeBlocked && (
          <div className="gate-fallback">&gt; {t("gate_close_fallback")}</div>
        )}
      </div>
    </div>
  );
}

type ScanIntroOverlayProps = {
  phase: ScanPhase;
  closeBlocked: boolean;
  onConfirm: () => void;
  onDecline: () => void;
};

export function ScanIntroOverlay({
  phase,
  closeBlocked,
  onConfirm,
  onDecline,
}: ScanIntroOverlayProps) {
  if (phase === "scan" || phase === "done") {
    return null;
  }

  return (
    <div className="scan-preamble" aria-hidden={phase === "gate" ? undefined : true}>
      <div className="preamble-tease">
        <div className="tease-prompt">[ &gt; ] boot</div>
        <div className="tease-name">
          Nicolás Sander
          <span className="caret" />
        </div>
        <div className="tease-rule" />
        <div className="tease-sub">~/portfolio</div>
        {phase === "gate" && (
          <GatePrompt
            closeBlocked={closeBlocked}
            onConfirm={onConfirm}
            onDecline={onDecline}
          />
        )}
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

  if (phase === "hold" || phase === "tease" || phase === "pause" || phase === "gate") {
    classes.push("is-preamble");
  }

  if (phase === "hold") classes.push("phase-hold");
  if (phase === "tease") classes.push("phase-tease");
  if (phase === "pause" || phase === "gate") classes.push("phase-pause");
  if (phase === "gate") classes.push("phase-gate");
  if (phase === "scan") classes.push("phase-scan");
  if (phase === "done") classes.push("is-settled");

  return classes.join(" ");
}
