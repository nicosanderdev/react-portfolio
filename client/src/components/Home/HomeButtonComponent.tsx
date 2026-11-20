import "./HomeButtonComponent.css";

type HomeButtonProps = {
  label: string;
  anchor: string;
  active: string;
  setActive: (value: string) => void;
  compact?: boolean;
};

function MenuLabel({ label }: { label: string }) {
  return (
    <>
      <span className="prompt" aria-hidden="true">
        [<span className="chevron">&gt;</span>]
      </span>
      <span className="name">
        {label}
        <span className="cursor" aria-hidden="true" />
      </span>
    </>
  );
}

function HomeButtonComponent({
  label,
  anchor,
  active,
  setActive,
  compact = false,
}: HomeButtonProps) {
  const isActive = active === anchor;

  return (
    <a
      href={`#${anchor}`}
      onClick={() => setActive(anchor)}
      className={`menu-btn${isActive ? " is-current" : ""}${compact ? " menu-btn--compact" : ""}`}
      aria-current={isActive ? "true" : undefined}
    >
      <span className="wipe" />
      <span className="face face-ink">
        <MenuLabel label={label} />
      </span>
      <span className="face face-paper" aria-hidden="true">
        <MenuLabel label={label} />
      </span>
    </a>
  );
}

export default HomeButtonComponent;
