import PhilosophySection from "./how-i-build/PhilosophySection";
import WorkflowCycle from "./how-i-build/WorkflowCycle";
import HumanVsAgent from "./how-i-build/HumanVsAgent";
import CaseStudyStepper from "./how-i-build/CaseStudyStepper";
import ArtifactsTaxonomy from "./how-i-build/ArtifactsTaxonomy";
import HowIBuildIntroWindow from "./how-i-build/HowIBuildIntroWindow";

const CORE_MESSAGE =
  "I decide what should exist. AI helps me understand what it takes. Agents build it. I verify that it deserves to exist.";

type HowIBuildPageProps = {
  isExpanded?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
};

function HowIBuildPage({
  isExpanded = false,
  onExpand,
  onCollapse,
}: HowIBuildPageProps) {
  return (
    <article
      className={`p-4 px-6 md:px-8 text-left font-mono text-gray-200 overflow-x-hidden${
        isExpanded ? " [&_.max-w-2xl]:max-w-4xl [&_.max-w-3xl]:max-w-5xl" : ""
      }`}
    >
      {isExpanded && (
        <button
          type="button"
          onClick={onCollapse}
          className="mb-4 text-sm text-emerald-400 cursor-pointer hover:text-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 transition-colors duration-200 ease-out"
        >
          ← Back
        </button>
      )}

      {!isExpanded && onExpand && (
        <HowIBuildIntroWindow onExplore={onExpand} />
      )}

      {isExpanded && (
        <>
          <header className="space-y-4 text-center motion-safe:animate-hib-enter">
            <h1 className="text-2xl md:text-3xl text-emerald-400 font-bold tracking-tight">
              How I Build Software
            </h1>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              I don&apos;t use AI to replace software engineering. I use it to
              increase the amount of engineering I can do.
            </p>
            <p className="text-sm md:text-base text-emerald-400/90 leading-relaxed max-w-3xl mx-auto border-l-2 border-emerald-400 pl-4 text-left">
              {CORE_MESSAGE}
            </p>
          </header>

          <div className="mt-16 space-y-16 md:space-y-20 min-w-0">
            <section
              id="philosophy"
              aria-label="Philosophy"
              className="border-t border-emerald-400/40 pt-10 md:pt-12 motion-safe:animate-hib-enter [animation-delay:60ms]"
            >
              <PhilosophySection />
            </section>

            <section
              id="workflow"
              aria-label="Workflow"
              className="border-t border-emerald-400/40 pt-10 md:pt-12 motion-safe:animate-hib-enter [animation-delay:120ms]"
            >
              <WorkflowCycle />
            </section>

            <section
              id="human-vs-agent"
              aria-label="Human vs Agent"
              className="border-t border-emerald-400/40 pt-10 md:pt-12"
            >
              <HumanVsAgent />
            </section>

            <section
              id="case-study"
              aria-label="Case study"
              className="border-t border-emerald-400/40 pt-10 md:pt-12"
            >
              <CaseStudyStepper />
            </section>

            <section
              id="artifacts"
              aria-label="Artifacts"
              className="border-t border-emerald-400/40 pt-10 md:pt-12"
            >
              <ArtifactsTaxonomy />
            </section>

            <footer
              aria-label="Closing message"
              className="border-t border-emerald-400/40 pt-10 md:pt-12 pb-2"
            >
              <p className="text-sm md:text-base text-emerald-400/90 leading-relaxed max-w-3xl border-l-2 border-emerald-400 pl-4">
                {CORE_MESSAGE}
              </p>
            </footer>
          </div>
        </>
      )}
    </article>
  );
}

export default HowIBuildPage;
