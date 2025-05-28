import React from "react";

type ExpMainContentIconProps = {
  anchor: string;
  active: string;
  setActive: (value: string) => void;
  icon: React.ReactNode;
  dotPosition?: "before" | "after";
};

const ExpMainContentIcon: React.FC<ExpMainContentIconProps> = ({ anchor, active, setActive, icon, dotPosition = "before" }) => {
  const isActive = active === anchor;

  const Dot = (
      <div
        className={`rounded-full hidden sm:block border-2 border-emerald-400 w-[16px] h-[16px] ${
          isActive ? "bg-emerald-400" : ""
        }`}
      ></div>
  );

  const Button = (
    <a onClick={() => setActive(anchor)}>
      <div
        className={`border border-emerald-400 p-4 m-4 hover:bg-emerald-400 group transition duration-100 ${
          isActive ? "bg-emerald-400" : ""
        }`}
      >
        <div
          className={`w-8 h-8 transition duration-100 ${
            isActive ? "text-gray-900" : "text-emerald-400"
          } group-hover:text-white`}
        >
          {icon}
        </div>
      </div>
    </a>
  );

  return (
    <div className="flex flex-row items-center">
      {dotPosition === "before" && Dot}
      {Button}
      {dotPosition === "after" && Dot}
    </div>
  );
};

export default ExpMainContentIcon;
