type HowIBuildIntroWindowProps = {
  onExplore: () => void;
};

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
        <button
          type="button"
          onClick={onExplore}
          className="px-3 py-2 border border-emerald-400 text-sm text-gray-200 cursor-pointer hover:bg-emerald-400 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 transition-[color,background-color,border-color] duration-200 ease-out"
        >
          Explore
        </button>
      </div>
    </aside>
  );
}

export default HowIBuildIntroWindow;
