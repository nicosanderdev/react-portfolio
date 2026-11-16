const AI_USES = [
  "Explore problems and map the solution space",
  "Identify unknowns before committing to a design",
  "Research APIs, patterns, and prior art",
  "Prototype options quickly enough to compare them",
  "Challenge assumptions I would otherwise leave untested",
  "Implement well-defined tasks once the contract is clear",
  "Generate and run tests against that contract",
  "Review diffs and draft documentation",
] as const;

const HUMAN_OWNS = [
  "Defining the goal and what success looks like",
  "Product decisions and user-facing trade-offs",
  "Priorities when time and scope collide",
  "Approving architecture before it becomes load-bearing",
  "Validating that the final result deserves to ship",
] as const;

function PhilosophyBridgeIllustration() {
  return (
    <svg
      viewBox="0 0 80 96"
      className="w-14 h-[4.25rem] md:w-16 md:h-[4.75rem] text-emerald-400"
      aria-hidden="true"
      focusable="false"
    >
      {/* Outer judgment ring — human responsibility */}
      <circle
        cx="40"
        cy="48"
        r="28"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      {/* Inner core — capability / AI */}
      <polygon
        points="40,28 54,40 54,56 40,68 26,56 26,40"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeOpacity="0.7"
        strokeWidth="1.25"
      />
      {/* Decision axis through the core */}
      <line
        x1="40"
        y1="22"
        x2="40"
        y2="74"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1"
      />
      {/* Left bridge — execution / AI side */}
      <line
        x1="4"
        y1="48"
        x2="26"
        y2="48"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <circle cx="8" cy="48" r="1.5" fill="currentColor" fillOpacity="0.55" />
      {/* Right bridge — ownership / human side */}
      <line
        x1="54"
        y1="48"
        x2="76"
        y2="48"
        stroke="currentColor"
        strokeOpacity="0.7"
        strokeWidth="1.25"
      />
      <rect
        x="72"
        y="45"
        width="6"
        height="6"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.8"
        strokeWidth="1"
      />
      {/* Judgment mark at center */}
      <circle cx="40" cy="48" r="3" fill="currentColor" fillOpacity="0.85" />
      {/* Small fork above — choice */}
      <path
        d="M40 22 L40 14 M40 14 L34 8 M40 14 L46 8"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1"
        strokeLinecap="square"
      />
    </svg>
  );
}

function PhilosophyCard({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <div className="flex-1 min-w-0 border border-emerald-400/40 bg-emerald-400/10 rounded-sm px-4 py-4 md:px-5 md:py-5">
      <h3 className="text-sm text-emerald-400/90 tracking-wide mb-3">{title}</h3>
      <ul className="space-y-2 text-sm text-gray-300 leading-relaxed list-none">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-emerald-400/70 shrink-0" aria-hidden="true">
              —
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PhilosophySection() {
  return (
    <>
      <h2 className="text-lg text-emerald-400">// Philosophy</h2>

      <div className="mt-6 space-y-8 md:space-y-10">
        <p className="mx-auto max-w-2xl text-center text-sm md:text-base text-gray-300 leading-relaxed">
          AI expands how much engineering I can move through in a given week.
          It does not replace the judgment that decides what is worth building,
          what is safe to ship, or what trade-off I am willing to own.
        </p>

        <div className="flex flex-col md:flex-row md:items-stretch gap-5 md:gap-4 lg:gap-6 max-w-5xl mx-auto">
          <PhilosophyCard title="AI is used to" items={AI_USES} />

          <div className="flex md:flex-col items-center justify-center shrink-0 py-1 md:px-1 md:py-0 md:self-center">
            <PhilosophyBridgeIllustration />
            <span className="sr-only">
              Bridge between AI execution and human ownership
            </span>
          </div>

          <PhilosophyCard title="I own" items={HUMAN_OWNS} />
        </div>

        <p className="mx-auto max-w-3xl text-center text-xl md:text-2xl text-emerald-400 leading-snug tracking-tight">
          I delegate execution, not responsibility.
        </p>

        <p className="mx-auto max-w-2xl text-center text-sm md:text-base text-gray-300 leading-relaxed">
          Capacity goes up. Accountability stays with me. That is the line the
          rest of this page is built around.
        </p>
      </div>
    </>
  );
}

export default PhilosophySection;
