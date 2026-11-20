import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import BrainGlyphs from "./BrainGlyphs";
import "./HowIBuildPage.css";

type HowIBuildPageProps = {
  isExpanded?: boolean;
  onExpand?: () => void;
};

type ProtocolBlock = {
  heading?: string;
  intro?: string;
  items?: string[];
};

type ProtocolSubstep = {
  title: string;
  lead?: string;
  blocks?: ProtocolBlock[];
  note?: {
    label: string;
    text: string;
  };
};

type ProtocolStepContent = {
  label: string;
  kicker: string;
  substeps: ProtocolSubstep[];
};

type ProtocolStep = ProtocolStepContent & {
  id: "01" | "02" | "03";
};

const LOAD_MS = 1500;
const DUMP_STEP_MS = 45;
const STEP_IDS = ["01", "02", "03"] as const;

type ProtocolRow =
  | { type: "id"; text: string }
  | { type: "name"; text: string }
  | { type: "kicker"; text: string }
  | { type: "title"; letter: string; text: string }
  | { type: "lead"; text: string }
  | { type: "heading"; text: string }
  | { type: "intro"; text: string }
  | { type: "item"; text: string }
  | { type: "note"; label: string; text: string };

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function stepLetter(index: number): string {
  return String.fromCharCode(65 + index);
}

function flattenStep(step: ProtocolStep): ProtocolRow[] {
  const rows: ProtocolRow[] = [
    { type: "id", text: step.id },
    { type: "name", text: step.label },
    { type: "kicker", text: step.kicker },
  ];

  step.substeps.forEach((substep, index) => {
    rows.push({
      type: "title",
      letter: stepLetter(index),
      text: substep.title,
    });
    if (substep.lead) rows.push({ type: "lead", text: substep.lead });
    substep.blocks?.forEach((block) => {
      if (block.heading) rows.push({ type: "heading", text: block.heading });
      if (block.intro) rows.push({ type: "intro", text: block.intro });
      block.items?.forEach((item) => rows.push({ type: "item", text: item }));
    });
    if (substep.note) {
      rows.push({
        type: "note",
        label: substep.note.label,
        text: substep.note.text,
      });
    }
  });

  return rows;
}

function renderSectionBody(rows: ProtocolRow[], section: number): ReactNode {
  const nodes: ReactNode[] = [];
  let index = 0;
  let block = 0;

  while (index < rows.length) {
    const row = rows[index];
    if (row.type === "lead") {
      nodes.push(
        <p className="protocol-lead" key={`lead-${section}-${index}`}>
          {row.text}
        </p>
      );
      index += 1;
      continue;
    }
    if (row.type === "note") {
      nodes.push(
        <p className="protocol-note" key={`note-${section}-${index}`}>
          <span className="protocol-note-label">{row.label}:</span> {row.text}
        </p>
      );
      index += 1;
      continue;
    }
    if (row.type === "heading" || row.type === "intro" || row.type === "item") {
      const heading = row.type === "heading" ? row.text : undefined;
      if (row.type === "heading") index += 1;

      const introRow = rows[index];
      const intro = introRow?.type === "intro" ? introRow.text : undefined;
      if (introRow?.type === "intro") index += 1;

      const items: string[] = [];
      while (rows[index]?.type === "item") {
        const item = rows[index];
        if (item?.type === "item") items.push(item.text);
        index += 1;
      }

      nodes.push(
        <div className="protocol-block" key={`block-${section}-${block}`}>
          {heading && <p className="protocol-block-heading">{heading}</p>}
          {intro && <p className="protocol-block-intro">{intro}</p>}
          {items.length > 0 && (
            <ul className="protocol-items">
              {items.map((item, itemIndex) => (
                <li key={`${section}-${block}-${itemIndex}`}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      );
      block += 1;
      continue;
    }
    index += 1;
  }

  return <>{nodes}</>;
}

function renderDump(rows: ProtocolRow[]): ReactNode {
  const nodes: ReactNode[] = [];
  let index = 0;

  const head: ProtocolRow[] = [];
  while (
    index < rows.length &&
    (rows[index].type === "id" ||
      rows[index].type === "name" ||
      rows[index].type === "kicker")
  ) {
    head.push(rows[index]);
    index += 1;
  }

  if (head.length > 0) {
    const id = head.find((row) => row.type === "id");
    const name = head.find((row) => row.type === "name");
    const kicker = head.find((row) => row.type === "kicker");
    nodes.push(
      <header className="protocol-step-head" key="head">
        {id?.type === "id" && <p className="protocol-step-id">{id.text}</p>}
        {(name || kicker) && (
          <div className="protocol-step-copy">
            {name?.type === "name" && (
              <p className="protocol-step-name">{name.text}</p>
            )}
            {kicker?.type === "kicker" && (
              <p className="protocol-kicker">{kicker.text}</p>
            )}
          </div>
        )}
      </header>
    );
  }

  let section = 0;
  while (index < rows.length) {
    const title = rows[index].type === "title" ? rows[index] : null;
    const sectionStart = index;
    if (title) index += 1;
    const body: ProtocolRow[] = [];
    while (index < rows.length && rows[index].type !== "title") {
      body.push(rows[index]);
      index += 1;
    }
    nodes.push(
      <section className="protocol-substep" key={`section-${sectionStart}`}>
        {title?.type === "title" && (
          <h3 className="protocol-substep-title">
            <span className="protocol-letter">{title.letter}</span>
            <span>{title.text}</span>
          </h3>
        )}
        {renderSectionBody(body, section)}
      </section>
    );
    section += 1;
  }

  const headNode = nodes[0];
  const sections = nodes.slice(1);
  return (
    <>
      {headNode}
      {sections.length > 0 && (
        <div className="protocol-substeps">{sections}</div>
      )}
    </>
  );
}

function isProtocolStepContent(value: unknown): value is ProtocolStepContent {
  if (!value || typeof value !== "object") return false;
  const step = value as ProtocolStepContent;
  return (
    typeof step.label === "string" &&
    typeof step.kicker === "string" &&
    Array.isArray(step.substeps)
  );
}

function HowIBuildPage({
  isExpanded = false,
  onExpand,
}: HowIBuildPageProps) {
  const { t } = useTranslation();
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<"loading" | "dump">("loading");
  const [visibleLines, setVisibleLines] = useState(0);
  const [imageOn, setImageOn] = useState(false);
  const [scanning, setScanning] = useState(false);
  const timers = useRef<number[]>([]);
  const token = useRef(0);
  const imageRevealed = useRef(false);
  const promptRef = useRef<HTMLButtonElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const steps: ProtocolStep[] = STEP_IDS.flatMap((id) => {
    const content = t(`protocol.steps.${id}`, { returnObjects: true });
    if (!isProtocolStepContent(content)) return [];
    return [{ id, ...content }];
  });

  function clearTimers() {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }

  function later(fn: () => void, ms: number) {
    timers.current.push(window.setTimeout(fn, ms));
  }

  function revealImage(run: number) {
    if (token.current !== run) return;
    setImageOn(true);
    if (imageRevealed.current || prefersReducedMotion()) {
      imageRevealed.current = true;
      return;
    }
    imageRevealed.current = true;
    setScanning(true);
  }

  function runStep(index: number) {
    if (index < 0 || index >= STEP_IDS.length) return;
    const run = ++token.current;
    clearTimers();
    setStepIndex(index);
    const next = steps[index];
    const total = next ? flattenStep(next).length : 0;

    if (prefersReducedMotion()) {
      setPhase("dump");
      setVisibleLines(total);
      revealImage(run);
      return;
    }

    setPhase("loading");
    setVisibleLines(0);
    later(() => {
      if (token.current !== run) return;
      setPhase("dump");
      revealImage(run);
      setVisibleLines(total > 0 ? 1 : 0);
      for (let line = 2; line <= total; line += 1) {
        later(() => {
          if (token.current !== run) return;
          setVisibleLines(line);
        }, DUMP_STEP_MS * (line - 1));
      }
    }, LOAD_MS);
  }

  useEffect(() => () => clearTimers(), []);

  useEffect(() => {
    if (!isExpanded) {
      token.current += 1;
      clearTimers();
      imageRevealed.current = false;
      setImageOn(false);
      setScanning(false);
      return;
    }
    runStep(0);
    return () => {
      token.current += 1;
      clearTimers();
    };
    // Restart the protocol only when the panel opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  useEffect(() => {
    if (phase !== "dump") return;
    const log = logRef.current;
    if (!log) return;
    log.scrollTop = log.scrollHeight;
  }, [phase, stepIndex, visibleLines]);

  useEffect(() => {
    if (isExpanded) return;
    promptRef.current?.focus();
  }, [isExpanded]);

  useEffect(() => {
    if (isExpanded) return;

    function onKey(event: KeyboardEvent) {
      if (event.key !== "Enter") return;
      const target = event.target;
      if (target instanceof Element) {
        if (target.closest("input, textarea, select, a")) return;
        const button = target.closest("button");
        if (button && button !== promptRef.current) return;
      }
      event.preventDefault();
      onExpand?.();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isExpanded, onExpand]);

  if (!isExpanded) {
    return (
      <article className="protocol-console protocol-console--intro">
        <div className="protocol-warn">
          <div className="protocol-warn-flag">
            <span className="protocol-bang" aria-hidden="true">
              [!]
            </span>
            <span>{t("protocol.warn_label")}</span>
          </div>
          <p className="protocol-warn-title">{t("protocol.warn_title")}</p>
          <p className="protocol-warn-body">{t("protocol.warn_body")}</p>
          <button
            ref={promptRef}
            type="button"
            className="protocol-prompt"
            onClick={onExpand}
          >
            <span aria-hidden="true">&gt;</span>
            <span>{t("protocol.press_enter")}</span>
            <span className="protocol-caret" aria-hidden="true" />
          </button>
        </div>
      </article>
    );
  }

  const step = steps[stepIndex];
  const lastIndex = Math.max(steps.length - 1, 0);

  return (
    <article className="protocol-console">
      <section
        className="protocol-window"
        aria-label={step ? `protocol/${step.id}` : "protocol"}
      >
        <div className="protocol-bar">
          <span className="protocol-marks" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="protocol-title">
            {step ? `protocol/${step.id}` : "protocol"}
          </span>
        </div>
        <div className="protocol-body">
          <div className="protocol-log" ref={logRef}>
            {!step || phase === "loading" ? (
              <div className="protocol-line" aria-live="polite">
                <span>&gt; step {step?.id ?? "01"}:</span>
                <span className="protocol-underscore" aria-hidden="true">
                  _
                </span>
              </div>
            ) : (
              renderDump(flattenStep(step).slice(0, visibleLines))
            )}
          </div>
          <figure
            className={`protocol-figure${imageOn ? " is-on" : ""}${scanning ? " is-scanning" : ""}`}
            onAnimationEnd={(event) => {
              if (event.animationName !== "protocol-scan-reveal") return;
              setScanning(false);
            }}
          >
            <BrainGlyphs />
            {scanning && <span className="protocol-scanline" aria-hidden="true" />}
          </figure>
        </div>
      </section>

      <div className="protocol-nav" role="tablist" aria-label="protocol">
        <button
          type="button"
          className="protocol-arrow"
          aria-label="previous step"
          disabled={stepIndex === 0}
          onClick={() => {
            if (stepIndex > 0) runStep(stepIndex - 1);
          }}
        >
          &lt;
        </button>
        {steps.map((item, index) => {
          const active = index === stepIndex;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={`protocol-check${active ? " is-active" : ""}`}
              onClick={() => {
                if (index !== stepIndex) runStep(index);
              }}
            >
              <span aria-hidden="true">{active ? "[x]" : "[ ]"}</span>
              <span className="protocol-check-label">{item.label}</span>
            </button>
          );
        })}
        <button
          type="button"
          className="protocol-arrow"
          aria-label="next step"
          disabled={stepIndex === lastIndex}
          onClick={() => {
            if (stepIndex < lastIndex) runStep(stepIndex + 1);
          }}
        >
          &gt;
        </button>
      </div>
    </article>
  );
}

export default HowIBuildPage;
