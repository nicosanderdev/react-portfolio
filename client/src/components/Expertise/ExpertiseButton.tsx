// Rename the file to ExpertiseButton.tsx if you like

type ExpertiseButtonProps = {
  anchor: string;
  active: string;
  setActive: (value: string) => void;
  icon: React.ReactNode;
  label: string;
  side: "left" | "right";
};

const ExpertiseButton: React.FC<ExpertiseButtonProps> = ({ anchor, active, setActive, icon, label, side }) => {
  const isActive = active === anchor;
  const activeClasses = `
    !bg-emerald-400 !border-none text-gray-900 shadow-lg !focus:outline-none !focus:ring-0 !focus:ring-offset-0
  `;
  const inactiveClasses = `
    text-emerald-400 !border-1 !border-emerald-400 !bg-transparent border-gray-500 hover:border-emerald-400 hover:text-white hover:bg-emerald-400/10
  `;

  return (
    <div className={`flex items-center w-full ${side === 'right' ? 'justify-start' : 'justify-end'}`}>
      <div className={`
        flex items-center w-full group
        ${side === 'right' ? 'flex-row' : 'flex-row-reverse'}
      `}>

        {/* Clickable button */}
        <button
          onClick={() => setActive(anchor)}
          className={`$font-mono border-2 rounded-sm p-3 my-2 w-full max-w-[200px] flex items-center gap-3 cursor-pointer transition-all duration-300
            ${isActive ? activeClasses : inactiveClasses}`}
        >
          <div className={`w-8 h-8 transition-colors duration-300 ${isActive ? 'text-gray-900' : 'text-emerald-400 group-hover:text-white'}`}>
            {icon}
          </div>
          <span className="text-base">{label}</span>
        </button>

        {/* Connecting line and node */}
        <div className={`flex items-center ${side == 'right' ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className={`w-8 border-t-3 ${isActive ? 'border-emerald-400' : 'border-gray-300'}`} />
          <div className={`rounded-full border-2 w-[16px] h-[16px] flex-shrink-0
            transition-colors duration-300
            ${isActive ? "bg-emerald-400 border-emerald-400" : "border-emerald-400 group-hover:bg-emerald-400"}
          `}></div>
        </div>

      </div>
    </div>
  );
};

export default ExpertiseButton;