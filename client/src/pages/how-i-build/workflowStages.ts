export type WorkflowStageId =
  | "intent"
  | "uncertainty"
  | "evidence"
  | "decision"
  | "contract"
  | "execution"
  | "proof"
  | "learning";

export type WorkflowStage = {
  id: WorkflowStageId;
  label: string;
  description: string;
};

export const WORKFLOW_STAGES: readonly WorkflowStage[] = [
  {
    id: "intent",
    label: "Intent",
    description: "Define what I am trying to achieve and why.",
  },
  {
    id: "uncertainty",
    label: "Uncertainty",
    description:
      "Identify what is unknown, ambiguous, risky, or insufficiently defined.",
  },
  {
    id: "evidence",
    label: "Evidence",
    description:
      "Use research, experimentation, and prototypes to reduce uncertainty.",
  },
  {
    id: "decision",
    label: "Decision",
    description:
      "Make the important human decisions based on the available evidence.",
  },
  {
    id: "contract",
    label: "Contract",
    description:
      "Translate decisions into specifications, acceptance criteria, constraints, and executable tasks.",
  },
  {
    id: "execution",
    label: "Execution",
    description:
      "Delegate implementation to an AI coding agent whenever the task is sufficiently well defined.",
  },
  {
    id: "proof",
    label: "Proof",
    description:
      "Validate via tests, review, browser verification, and human inspection.",
  },
  {
    id: "learning",
    label: "Learning",
    description:
      "Capture discoveries, decisions, and lessons for future iterations.",
  },
] as const;

export const DEFAULT_WORKFLOW_STAGE_ID: WorkflowStageId = "intent";
