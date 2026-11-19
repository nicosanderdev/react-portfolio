import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getSectionById,
  type PortfolioSectionId,
} from "../../pages/sectionRegistry";
import {
  BOOT_MS,
  CLOSE_MS,
  FLOOD_MS,
  REVEAL_MS,
  SAVING_MS,
  floodLines,
  introLines,
  savingWord,
  swapLang,
} from "./sectionSwap";

type Phase = "settled" | "saving" | "closing" | "booting" | "revealing";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useSectionSwap(enabled: boolean) {
  const { t, i18n } = useTranslation();
  const [pending, setPending] = useState<PortfolioSectionId | null>(null);
  const [shown, setShown] = useState<PortfolioSectionId | null>(null);
  const [phase, setPhase] = useState<Phase>("settled");
  const [saveDots, setSaveDots] = useState(1);
  const [bootLines, setBootLines] = useState<string[]>([]);

  const seq = useRef(0);
  const timers = useRef<number[]>([]);
  const windowOpen = useRef(true);
  const phaseRef = useRef<Phase>("settled");
  const shownRef = useRef<PortfolioSectionId | null>(null);
  const langRef = useRef(i18n.language);
  const enabledRef = useRef(enabled);
  const windowRef = useRef<HTMLDivElement>(null);
  const bootLogRef = useRef<HTMLDivElement>(null);

  langRef.current = i18n.language;
  enabledRef.current = enabled;

  function clearTimers() {
    for (const id of timers.current) window.clearTimeout(id);
    timers.current = [];
  }

  function later(fn: () => void, ms: number) {
    const handle = window.setTimeout(fn, ms);
    timers.current.push(handle);
  }

  function setPhaseBoth(next: Phase) {
    phaseRef.current = next;
    setPhase(next);
  }

  function commit(id: PortfolioSectionId) {
    shownRef.current = id;
    setShown(id);
    windowOpen.current = true;
    setPhaseBoth("settled");
    setBootLines([]);
    setSaveDots(1);
  }

  function startReveal(token: number, id: PortfolioSectionId) {
    if (token !== seq.current) return;
    shownRef.current = id;
    setShown(id);
    windowOpen.current = true;
    setPhaseBoth("revealing");
    setBootLines([]);
    setSaveDots(1);
    later(() => {
      if (token !== seq.current) return;
      setPhaseBoth("settled");
    }, REVEAL_MS);
  }

  function startFlood(token: number, id: PortfolioSectionId) {
    if (token !== seq.current) return;
    const lines = floodLines(id);
    const step = FLOOD_MS / lines.length;
    setBootLines((prev) => [...prev, lines[0]]);
    for (let i = 1; i < lines.length; i++) {
      const text = lines[i];
      later(() => {
        if (token !== seq.current) return;
        setBootLines((prev) => [...prev, text]);
      }, Math.round(i * step));
    }
    later(() => {
      startReveal(token, id);
    }, FLOOD_MS);
  }

  function startBoot(token: number, id: PortfolioSectionId) {
    if (token !== seq.current) return;
    setPhaseBoth("booting");
    windowOpen.current = false;
    const lines = introLines(swapLang(langRef.current), id);
    setBootLines([lines[0]]);
    for (let i = 1; i < lines.length; i++) {
      const text = lines[i];
      later(() => {
        if (token !== seq.current) return;
        setBootLines((prev) => [...prev, text]);
      }, Math.round((BOOT_MS * i) / lines.length));
    }
    later(() => {
      startFlood(token, id);
    }, BOOT_MS);
  }

  function startClose(token: number, id: PortfolioSectionId) {
    if (token !== seq.current) return;
    setPhaseBoth("closing");
    windowOpen.current = false;
    later(() => {
      startBoot(token, id);
    }, CLOSE_MS);
  }

  function startSaving(token: number, id: PortfolioSectionId) {
    if (token !== seq.current) return;
    setPhaseBoth("saving");
    setSaveDots(1);
    for (let dot = 2; dot <= 3; dot++) {
      const count = dot;
      later(() => {
        if (token !== seq.current) return;
        setSaveDots(count);
      }, Math.round((SAVING_MS * (dot - 1)) / 3));
    }
    later(() => {
      startClose(token, id);
    }, SAVING_MS);
  }

  function request(id: PortfolioSectionId) {
    if (id === shownRef.current && phaseRef.current === "settled") return;

    clearTimers();
    seq.current += 1;
    const token = seq.current;
    setPending(id);

    if (prefersReducedMotion() || !enabledRef.current) {
      commit(id);
      return;
    }

    if (windowOpen.current) startSaving(token, id);
    else startBoot(token, id);
  }

  useEffect(() => () => clearTimers(), []);

  useEffect(() => {
    const el = bootLogRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [bootLines]);

  const lang = swapLang(i18n.language);
  const barTitle =
    phase === "saving" || phase === "closing"
      ? savingWord(lang, saveDots)
      : shown
        ? `// ${t(getSectionById(shown).headerKey)}`
        : `// ${t("idle_bar")}`;

  const className = [
    phase === "saving" ? "is-saving" : "",
    phase === "closing" ? "is-closing" : "",
    phase === "booting" ? "is-booting" : "",
    phase === "revealing" ? "is-revealing" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return {
    pending,
    shown,
    revealing: phase === "revealing",
    request,
    barTitle,
    bootLines,
    className,
    bootLogRef,
    windowRef,
  };
}
