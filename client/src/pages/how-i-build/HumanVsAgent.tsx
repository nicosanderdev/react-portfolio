const HUMAN_RESPONSIBILITIES = [
  "Goals",
  "Product decisions",
  "Priorities",
  "Technical trade-offs",
  "Architecture decisions",
  "Business constraints",
  "UX decisions",
  "Final approval",
  "Responsibility for the outcome",
] as const;

const AGENT_RESPONSIBILITIES = [
  "Codebase exploration",
  "Research assistance",
  "Prototyping",
  "Implementation",
  "Test generation",
  "Refactoring",
  "Documentation",
  "Code review assistance",
  "Verification assistance",
] as const;

const OVERLAP_WORK = ["Research", "Specification", "Validation"] as const;

type Side = "human" | "agent";

function HumanVsAgentIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 240"
      className={className}
      role="img"
      aria-label="Human versus Agent"
    >
      <title>Human versus Agent</title>

      <g stroke="currentColor" strokeOpacity="0.07" strokeWidth="0.75">
        {[44, 64, 84, 100, 116, 136, 156].map((x) => (
          <line key={`v-${x}`} x1={x} y1={30} x2={x} y2={210} />
        ))}
        {[52, 72, 92, 112, 132, 152, 172, 192].map((y) => (
          <line key={`h-${y}`} x1={30} y1={y} x2={170} y2={y} />
        ))}
      </g>

      <polygon
        points="100,16 174,68 174,172 100,224 26,172 26,68"
        fill="currentColor"
        fillOpacity="0.04"
        stroke="currentColor"
        strokeOpacity="0.95"
        strokeWidth="2"
      />

      <line
        x1="100"
        y1="32"
        x2="100"
        y2="208"
        stroke="currentColor"
        strokeOpacity="0.7"
        strokeWidth="1.25"
      />

      {/* Human head profile facing toward center */}
      <path
        d="M52 108
           C52 84 64 66 82 66
           C92 66 99 74 100 84
           L106 94
           L100 98
           L102 104
           L98 108
           L96 124
           C94 134 82 140 70 136
           C60 132 52 122 52 108 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Agent robot head */}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="128" y1="58" x2="128" y2="72" />
        <circle
          cx="128"
          cy="54"
          r="3.5"
          fill="currentColor"
          fillOpacity="0.9"
          stroke="none"
        />
        <rect x="108" y="72" width="40" height="38" rx="5" />
        <rect
          x="116"
          y="84"
          width="5"
          height="11"
          rx="2.5"
          fill="currentColor"
          fillOpacity="0.85"
          stroke="none"
        />
        <rect
          x="135"
          y="84"
          width="5"
          height="11"
          rx="2.5"
          fill="currentColor"
          fillOpacity="0.85"
          stroke="none"
        />
        <rect x="148" y="86" width="7" height="10" rx="1.5" />
      </g>

      <g
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1"
        strokeDasharray="2.5 2.5"
      >
        <line x1="90" y1="102" x2="95" y2="114" />
        <line x1="88" y1="112" x2="95" y2="120" />
        <line x1="90" y1="122" x2="95" y2="126" />
        <line x1="110" y1="102" x2="105" y2="114" />
        <line x1="112" y1="112" x2="105" y2="120" />
        <line x1="110" y1="122" x2="105" y2="126" />
      </g>

      <rect
        x="87"
        y="108"
        width="26"
        height="24"
        fill="#0b1220"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <text
        x="100"
        y="125"
        textAnchor="middle"
        fill="currentColor"
        fontSize="10"
        fontFamily='"Share Tech Mono", ui-monospace, monospace'
        fontWeight="700"
        letterSpacing="1.2"
      >
        VS
      </text>
    </svg>
  );
}

function TerminalNode({
  label,
  index,
  side,
}: {
  label: string;
  index: number;
  side: Side;
}) {
  const delayMs = 140 + index * 30;
  const enterClass =
    side === "human"
      ? "motion-safe:animate-hib-from-left"
      : "motion-safe:animate-hib-from-right";

  return (
    <li
      className={`min-w-0 ${enterClass}`}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="border border-emerald-400/30 bg-emerald-400/[0.03] px-2 py-1.5 h-full">
        <div className="flex items-start gap-2 min-w-0">
          <span className="inline-flex gap-0.5 shrink-0 mt-1.5" aria-hidden="true">
            <span className="w-1 h-1 rounded-full bg-emerald-400/80" />
            <span className="w-1 h-1 rounded-full bg-emerald-400/45" />
            <span className="w-1 h-1 rounded-full bg-emerald-400/25" />
          </span>
          <span className="text-xs md:text-[0.8125rem] text-gray-300 leading-snug">
            {label}
          </span>
        </div>
      </div>
    </li>
  );
}

function SideCluster({
  title,
  items,
  side,
}: {
  title: string;
  items: readonly string[];
  side: Side;
}) {
  return (
    <div
      className={`flex flex-col gap-3 min-w-0 ${
        side === "human" ? "md:items-end" : "md:items-start"
      }`}
    >
      <div
        className={`flex items-center gap-2 w-full ${
          side === "human" ? "justify-start md:justify-end" : "justify-start"
        } motion-safe:animate-hib-enter`}
        style={{ animationDelay: side === "human" ? "40ms" : "60ms" }}
      >
        {side === "agent" && (
          <span className="h-px w-5 bg-emerald-400/40" aria-hidden="true" />
        )}
        <h3 className="text-xs md:text-sm text-emerald-400 font-bold tracking-[0.18em] uppercase">
          {title}
        </h3>
        {side === "human" && (
          <span className="h-px w-5 bg-emerald-400/40" aria-hidden="true" />
        )}
      </div>

      {/* Dense node field — reads as a cluster orbiting the center, not a card */}
      <ul
        className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full list-none"
        aria-label={title}
      >
        {items.map((item, index) => (
          <TerminalNode key={item} label={item} index={index} side={side} />
        ))}
      </ul>

      {/* Side stub connectors toward center (md+) */}
      <div
        className={`hidden md:flex items-center gap-1 text-emerald-400/40 ${
          side === "human" ? "self-end flex-row" : "self-start flex-row-reverse"
        }`}
        aria-hidden="true"
      >
        <span className="w-1 h-1 rounded-full bg-emerald-400/50" />
        <span className="w-8 h-px border-t border-dashed border-emerald-400/35" />
        <span className="w-1.5 h-1.5 rotate-45 border border-emerald-400/40" />
      </div>
    </div>
  );
}

function SharedWorkBlock() {
  return (
    <div className="relative mt-10 md:mt-12 max-w-3xl mx-auto motion-safe:animate-hib-enter [animation-delay:420ms]">
      <div className="flex flex-col items-center mb-5" aria-hidden="true">
        <div className="w-px h-7 bg-gradient-to-b from-emerald-400/50 to-emerald-400/15" />
        <div className="flex items-center gap-2 w-full max-w-xs">
          <span className="h-px flex-1 bg-emerald-400/25" />
          <span className="w-1.5 h-1.5 rotate-45 border border-emerald-400/50" />
          <span className="h-px flex-1 bg-emerald-400/25" />
        </div>
      </div>

      <div className="border border-emerald-400/30 bg-emerald-400/[0.04] px-4 py-4 space-y-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex gap-0.5" aria-hidden="true">
            <span className="w-1 h-1 rounded-full bg-emerald-400/80" />
            <span className="w-1 h-1 rounded-full bg-emerald-400/45" />
            <span className="w-1 h-1 rounded-full bg-emerald-400/25" />
          </span>
          <h3 className="text-sm md:text-base text-emerald-400 font-bold tracking-tight">
            Overlap — shared work
          </h3>
        </div>

        <p className="text-sm text-gray-400">
          Collaboration across the boundary:
        </p>

        <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 text-sm md:text-base text-gray-300 list-none">
          {OVERLAP_WORK.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-2 border border-emerald-400/25 px-3 py-1.5"
            >
              <span className="text-emerald-400/70" aria-hidden="true">
                +
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-3xl">
        The boundary is not absolute. Humans and agents collaborate during
        research, specification, and validation.
      </p>
    </div>
  );
}

function HumanVsAgent() {
  return (
    <div className="font-mono text-gray-200 space-y-6 min-w-0">
      <h2 className="text-lg text-emerald-400">// Human vs Agent</h2>

      <div className="relative mt-2 md:mt-4 max-w-6xl mx-auto">
        {/*
          Desktop composition:
            HUMAN cluster | CENTER ICON | AGENT cluster
          Mobile composition:
            HUMAN → CENTER → AGENT (vertical spine)
        */}
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-5 md:gap-4 lg:gap-6 items-start">
          {/* Human */}
          <div className="order-1 min-w-0 md:pt-2">
            <SideCluster
              title="Human"
              items={HUMAN_RESPONSIBILITIES}
              side="human"
            />
            <div
              className="md:hidden flex flex-col items-center gap-1 mt-4"
              aria-hidden="true"
            >
              <span className="w-px h-5 bg-emerald-400/30" />
              <span className="w-1 h-1 rounded-full bg-emerald-400/50" />
            </div>
          </div>

          {/* Central anchor — top-aligned so it leads the section */}
          <div className="order-2 flex flex-col items-center motion-safe:animate-hib-enter md:pt-6 lg:pt-8">
            <div className="relative">
              <div
                className="absolute -inset-3 border border-emerald-400/15 pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-emerald-400/50"
                aria-hidden="true"
              />
              <div
                className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-emerald-400/50"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-emerald-400/50"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-emerald-400/50"
                aria-hidden="true"
              />

              <HumanVsAgentIcon className="w-44 h-[13.2rem] sm:w-52 sm:h-[15.6rem] md:w-40 md:h-48 lg:w-52 lg:h-[15.6rem] xl:w-60 xl:h-[18rem] text-emerald-400" />
            </div>

            <div
              className="hidden md:flex items-center gap-2 mt-4 text-emerald-400/45"
              aria-hidden="true"
            >
              <span className="w-6 h-px border-t border-dashed border-emerald-400/35" />
              <span className="w-1 h-1 rounded-full bg-emerald-400/50" />
              <span className="w-6 h-px border-t border-dashed border-emerald-400/35" />
            </div>

            <div
              className="md:hidden flex flex-col items-center gap-1 mt-4"
              aria-hidden="true"
            >
              <span className="w-1 h-1 rounded-full bg-emerald-400/50" />
              <span className="w-px h-5 bg-emerald-400/30" />
            </div>
          </div>

          {/* Agent */}
          <div className="order-3 min-w-0 md:pt-2">
            <SideCluster
              title="Agent"
              items={AGENT_RESPONSIBILITIES}
              side="agent"
            />
          </div>
        </div>
      </div>

      <SharedWorkBlock />
    </div>
  );
}

export default HumanVsAgent;
