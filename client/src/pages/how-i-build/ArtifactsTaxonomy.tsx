import type { CaseStudyStepId } from "./caseStudyData";

type ArtifactEntry = {
  type: string;
  role: string;
  stepId: CaseStudyStepId;
};

const ARTIFACTS: ArtifactEntry[] = [
  {
    type: "Research documents",
    role: "Capture what was learned before a design hardens.",
    stepId: "research",
  },
  {
    type: "Specifications",
    role: "Define the contract agents and humans both build against.",
    stepId: "specification",
  },
  {
    type: "Decision logs",
    role: "Record why an option won so later work can trust the choice.",
    stepId: "decision",
  },
  {
    type: "Prototypes",
    role: "Prove a path is viable before committing the real shape.",
    stepId: "prototype",
  },
  {
    type: "Task breakdowns",
    role: "Split approved work into scoped, reviewable units.",
    stepId: "tasks",
  },
  {
    type: "Acceptance criteria",
    role: "State the checks that mean “done” without reopening debate.",
    stepId: "specification",
  },
  {
    type: "Test plans",
    role: "Specify how the contract will be exercised before merge.",
    stepId: "tests",
  },
  {
    type: "Code reviews",
    role: "Verify the change matches the decision and the spec.",
    stepId: "implementation",
  },
  {
    type: "Documentation",
    role: "Leave operable knowledge for the next person (or agent).",
    stepId: "production",
  },
];

function ArtifactsTaxonomy() {
  return (
    <div className="font-mono text-gray-200">
      <h2 className="text-lg text-emerald-400">// Artifacts</h2>
      <p className="mt-2 text-sm md:text-base text-gray-300 leading-relaxed max-w-3xl">
        The durable output is persistent engineering knowledge, not just code.
        Each artifact type below is a reusable record of judgment — jump to the
        case study step where it appears.
      </p>

      <ul className="mt-6 space-y-3 max-w-3xl list-none">
        {ARTIFACTS.map((artifact) => (
          <li key={artifact.type} className="flex flex-col sm:flex-row sm:gap-3">
            <a
              href={`#case-step-${artifact.stepId}`}
              className="shrink-0 text-sm text-emerald-400 hover:text-emerald-300 underline underline-offset-2 decoration-emerald-400/50 hover:decoration-emerald-300 transition-colors"
            >
              {artifact.type}
            </a>
            <span className="text-sm text-gray-400 leading-relaxed">
              {artifact.role}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArtifactsTaxonomy;
