type HomeButtonProps = {
  label: string;
  anchor: string;
  active: string;
  setActive: (value: string) => void;
};

function HomeButtonComponent({ label, anchor, active, setActive } : HomeButtonProps) {
    const isActive = active === anchor;

    return (
        <a href={`#${anchor}`} onClick={() => setActive(anchor)}>
            <div className={`border border-emerald-400 p-6 me-6 mt-6 group transition duration-100 hover:bg-emerald-400 ${isActive ? "bg-emerald-400" : ""}`}>
                <li className="text-center">
                    <span className={`text-3xl font-mono ${isActive ? "font-bold text-gray-900" : "text-gray-200"}`}>
                        [] {label}
                    </span>
                </li>
            </div>
        </a>
    );
}

export default HomeButtonComponent;