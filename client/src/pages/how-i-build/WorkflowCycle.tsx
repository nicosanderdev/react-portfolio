import { useState } from "react";
import {
  DEFAULT_WORKFLOW_STAGE_ID,
  WORKFLOW_STAGES,
} from "./workflowStages";

const LOOP_ARROW = "↺";
const STAGE_COUNT = WORKFLOW_STAGES.length;

function formatStageIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

function WorkflowCycle() {
  const initialIndex = Math.max(
    0,
    WORKFLOW_STAGES.findIndex((stage) => stage.id === DEFAULT_WORKFLOW_STAGE_ID),
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [navDirection, setNavDirection] = useState<"next" | "prev" | "idle">(
    "idle",
  );

  const stage = WORKFLOW_STAGES[activeIndex] ?? WORKFLOW_STAGES[0];
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === STAGE_COUNT - 1;
  const stageIndicator = `${formatStageIndex(activeIndex)} / ${String(STAGE_COUNT).padStart(2, "0")}`;

  function goPrevious() {
    if (isFirst) return;
    setNavDirection("prev");
    setActiveIndex((index) => index - 1);
  }

  function goNext() {
    if (isLast) return;
    setNavDirection("next");
    setActiveIndex((index) => index + 1);
  }

  const panelMotionClass =
    navDirection === "prev"
      ? "motion-safe:animate-hib-console-prev"
      : navDirection === "next"
        ? "motion-safe:animate-hib-console-next"
        : "motion-safe:animate-hib-panel-in";

  return (
    <div className="font-mono text-gray-200 min-w-0">
      <h2 className="text-lg text-emerald-400">// Workflow</h2>
      <p className="mt-2 text-sm text-gray-400 max-w-2xl leading-relaxed">
        An engineering loop — not a one-way pipeline. Learning feeds the next
        Intent.
      </p>

      <div className="mt-8 md:mt-10 flex flex-col items-center">
        <div
          className="w-full max-w-2xl border-2 border-emerald-400 bg-emerald-400/5 motion-safe:animate-hib-enter"
          role="region"
          aria-label="Workflow stage console"
          aria-live="polite"
        >
          <div className="border-b border-emerald-400/40 px-3 py-1.5 flex items-center justify-between gap-3">
            <span className="text-xs text-emerald-400">// workflow_stage</span>
            <span className="text-xs text-emerald-400/80 tabular-nums tracking-wider">
              {stageIndicator}
            </span>
          </div>

          <div className="p-4 md:p-6 min-h-[12.5rem] md:min-h-[13.5rem]">
            <div key={stage.id} className={panelMotionClass}>
              <p className="text-xs text-emerald-400/70 tracking-wide">
                stage_{formatStageIndex(activeIndex)}
              </p>
              <h3 className="mt-2 text-xl md:text-2xl text-white font-bold tracking-tight">
                {stage.label}
              </h3>

              <div className="mt-4 border border-emerald-400/40 bg-black/20">
                <div className="border-b border-emerald-400/30 px-3 py-1">
                  <span className="text-xs text-emerald-400/80">
                    // {stage.label.toLowerCase()}
                  </span>
                </div>
                <div className="px-3 py-3 md:px-4 md:py-4">
                  <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                    <span className="text-emerald-400/80 select-none" aria-hidden="true">
                      {"> "}
                    </span>
                    {stage.description}
                  </p>

                  {stage.id === "learning" && (
                    <p className="mt-4 text-xs text-emerald-400/90 border-t border-emerald-400/30 pt-3">
                      {LOOP_ARROW} Feeds back into Intent for the next
                      iteration.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav
          aria-label="Workflow stage navigation"
          className="mt-5 w-full max-w-2xl flex items-center justify-between gap-4"
        >
          <button
            type="button"
            onClick={goPrevious}
            disabled={isFirst}
            aria-label="Previous workflow stage"
            className={`px-3 py-2 border text-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 transition-[color,background-color,border-color,opacity] duration-200 ease-out ${
              isFirst
                ? "border-emerald-400/20 text-gray-600 cursor-not-allowed opacity-40"
                : "border-emerald-400/60 text-gray-200 hover:border-emerald-400 hover:bg-emerald-400/10"
            }`}
          >
            {"< Previous"}
          </button>

          <span
            className="text-xs text-emerald-400/70 tabular-nums tracking-wider hidden sm:inline"
            aria-hidden="true"
          >
            {stageIndicator}
          </span>

          <button
            type="button"
            onClick={goNext}
            disabled={isLast}
            aria-label="Next workflow stage"
            className={`px-3 py-2 border text-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 transition-[color,background-color,border-color,opacity] duration-200 ease-out ${
              isLast
                ? "border-emerald-400/20 text-gray-600 cursor-not-allowed opacity-40"
                : "border-emerald-400/60 text-gray-200 hover:border-emerald-400 hover:bg-emerald-400/10"
            }`}
          >
            {"Next >"}
          </button>
        </nav>
      </div>
    </div>
  );
}

export default WorkflowCycle;
