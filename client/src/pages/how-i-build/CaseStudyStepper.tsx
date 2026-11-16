import { useEffect, useState } from "react";
import {
  CASE_STUDY_STEPS,
  DEFAULT_CASE_STUDY_STEP_ID,
  type CaseStudyStepId,
} from "./caseStudyData";

const CASE_STEP_HASH_RE = /^#case-step-([\w-]+)$/;

export function caseStepIdFromHash(hash: string): CaseStudyStepId | null {
  const match = CASE_STEP_HASH_RE.exec(hash);
  if (!match) return null;
  const id = match[1];
  return CASE_STUDY_STEPS.some((step) => step.id === id)
    ? (id as CaseStudyStepId)
    : null;
}

function CaseStudyStepper() {
  const [activeId, setActiveId] = useState<CaseStudyStepId>(() => {
    if (typeof window === "undefined") return DEFAULT_CASE_STUDY_STEP_ID;
    return caseStepIdFromHash(window.location.hash) ?? DEFAULT_CASE_STUDY_STEP_ID;
  });

  useEffect(() => {
    function syncFromHash() {
      const id = caseStepIdFromHash(window.location.hash);
      if (id) setActiveId(id);
    }

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  // Scroll after the target panel is unhidden (hash deep-links / artifact jumps).
  useEffect(() => {
    const id = caseStepIdFromHash(window.location.hash);
    if (!id || id !== activeId) return;
    document
      .getElementById(`case-step-${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeId]);

  return (
    <div className="font-mono text-gray-200 min-w-0">
      <h2 className="text-lg text-emerald-400">// Case study</h2>
      <p className="mt-2 text-sm md:text-base text-gray-300 leading-relaxed max-w-3xl">
        Contact form migration: Express + Gmail API → Supabase Edge Function +
        DB + email (Resend).
      </p>

      <p className="mt-4 text-xs md:text-sm text-gray-400 leading-relaxed max-w-3xl border-l-2 border-emerald-400/50 pl-4">
        Some panels are illustrative excerpts of the method — they show how a
        stage would look, not a claim that every panel is an original working
        document from this project. Steps marked{" "}
        <span className="text-emerald-400/90">real</span> quote short excerpts
        from the repo (or its git history).
      </p>

      {/* selector → panel stack; wrap on wider screens (no forced horizontal scroll) */}
      <div className="mt-6 flex flex-col gap-5 min-w-0">
        <nav
          aria-label="Case study steps"
          className="flex flex-col gap-2 sm:flex-row sm:flex-wrap min-w-0"
        >
          {CASE_STUDY_STEPS.map((step, index) => {
            const isActive = step.id === activeId;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveId(step.id)}
                aria-current={isActive ? "step" : undefined}
                className={`w-full sm:w-auto min-w-0 border px-3 py-2 text-left text-xs sm:text-sm rounded-sm cursor-pointer transition-[color,background-color,border-color,transform] duration-200 ease-out
                  ${
                    isActive
                      ? "border-emerald-400 bg-emerald-400 text-gray-900 motion-safe:animate-hib-stage-focus"
                      : "border-emerald-400/40 text-emerald-400/90 hover:border-emerald-400 hover:bg-emerald-400/10"
                  }`}
              >
                <span className="block text-[10px] sm:text-xs opacity-70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="block sm:whitespace-nowrap">{step.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Panels stay mounted so #case-step-* anchors exist for ticket 07 */}
        {CASE_STUDY_STEPS.map((step) => {
          const isActive = step.id === activeId;
          return (
            <div
              key={step.id}
              id={`case-step-${step.id}`}
              data-step={step.id}
              data-step-kind={step.kind}
              hidden={!isActive}
              className="border border-emerald-400/40 rounded-sm p-4 md:p-5 scroll-mt-24 min-w-0"
            >
              <div
                key={isActive ? activeId : step.id}
                className={isActive ? "motion-safe:animate-hib-panel-in" : undefined}
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                  <h3 className="text-base md:text-lg text-emerald-400">
                    {step.label}
                  </h3>
                  <span
                    className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 border rounded-sm ${
                      step.kind === "real"
                        ? "border-emerald-400/70 text-emerald-400/90"
                        : "border-gray-500 text-gray-400"
                    }`}
                  >
                    {step.kind}
                  </span>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed mb-4 max-w-3xl">
                  {step.summary}
                </p>

                <div className="space-y-4">
                  {step.excerpts.map((excerpt) => (
                    <figure
                      key={`${step.id}-${excerpt.label}`}
                      className="min-w-0"
                    >
                      <figcaption className="mb-1.5 flex flex-col sm:flex-row sm:items-baseline sm:gap-2 min-w-0">
                        <span className="text-xs text-emerald-400/80">
                          {excerpt.label}
                        </span>
                        {excerpt.source ? (
                          <span className="text-[10px] sm:text-xs text-gray-500 truncate">
                            {excerpt.source}
                          </span>
                        ) : null}
                      </figcaption>
                      <pre className="overflow-x-auto max-w-full text-[11px] sm:text-xs leading-relaxed text-gray-300 bg-black/30 border border-emerald-400/20 rounded-sm p-3 whitespace-pre">
                        <code>{excerpt.code}</code>
                      </pre>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CaseStudyStepper;
