import "./HowIBuildIntroWindow.css";

type HowIBuildIntroWindowProps = {
  onExplore: () => void;
};

function ExploreLabel() {
  return (
    <span className="label">
      <span className="prompt" aria-hidden="true">&gt;</span>
      Explore
      <span className="cursor" aria-hidden="true" />
    </span>
  );
}

function HowIBuildIntroWindow({ onExplore }: HowIBuildIntroWindowProps) {
  return (
    <aside
      aria-label="How I Build introduction"
      className="border-2 border-emerald-400 text-left"
    >
      <div className="border-b border-emerald-400/40 px-3 py-1 text-xs text-emerald-400">
        // intro
      </div>
      <div className="p-4 space-y-3">
        <p className="text-sm md:text-base text-gray-300 leading-relaxed">
          Introductory window. Content will be added here.
        </p>
        <button type="button" onClick={onExplore} className="explore-btn">
          <span className="wipe" />
          <span className="face face-ink">
            <ExploreLabel />
          </span>
          <span className="face face-paper" aria-hidden="true">
            <ExploreLabel />
          </span>
        </button>
      </div>
    </aside>
  );
}

export default HowIBuildIntroWindow;
