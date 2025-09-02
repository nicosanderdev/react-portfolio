import { useState, useMemo } from "react";
import TypingText from "../components/TypingText";
import ExpertiseButton from "../components/Expertise/ExpertiseButton";
import { useTranslation } from "react-i18next";

// Define all expertise items in one place. This makes adding/removing items trivial.
const expertiseItems = [
  {
    anchor: "uno",
    i18nKey: "backend_dev",
    side: "left",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1M5 12h14M5 12a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1m-2 3h.01M14 15h.01M17 9h.01M14 9h.01" />
      </svg>
    ),
  },
  {
    anchor: "dos",
    i18nKey: "frontend_dev",
    side: "left",
    icon: (
      <svg fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14" />
      </svg>
    ),
  },
  {
    anchor: "tres",
    i18nKey: "databases",
    side: "left",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 7.205c4.418 0 8-1.165 8-2.602C20 3.165 16.418 2 12 2S4 3.165 4 4.603c0 1.437 3.582 2.602 8 2.602ZM12 22c4.963 0 8-1.686 8-2.603v-4.404c-.052.032-.112.06-.165.09a7.75 7.75 0 0 1-.745.387c-.193.088-.394.173-.6.253-.063.024-.124.05-.189.073a18.934 18.934 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.073a10.143 10.143 0 0 1-.852-.373 7.75 7.75 0 0 1-.493-.267c-.053-.03-.113-.058-.165-.09v4.404C4 20.315 7.037 22 12 22Zm7.09-13.928a9.91 9.91 0 0 1-.6.253c-.063.025-.124.05-.189.074a18.935 18.935 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.074a10.163 10.163 0 0 1-.852-.372 7.816 7.816 0 0 1-.493-.268c-.055-.03-.115-.058-.167-.09V12c0 .917 3.037 2.603 8 2.603s8-1.686 8-2.603V7.596c-.052.031-.112.059-.165.09a7.816 7.816 0 0 1-.745.386Z" />
      </svg>
    ),
  },
  {
    anchor: "cuatro",
    i18nKey: "security",
    side: "right",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    anchor: "cinco",
    i18nKey: "api_design",
    side: "right",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3" />
      </svg>
    ),
  },
  {
    anchor: "seis",
    i18nKey: "dev_ops",
    side: "right",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M6 5a2 2 0 0 1 2-2h4.157a2 2 0 0 1 1.656.879L15.249 6H19a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2v-5a3 3 0 0 0-3-3h-3.22l-1.14-1.682A3 3 0 0 0 9.157 6H6V5Z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M3 9a2 2 0 0 1 2-2h4.157a2 2 0 0 1 1.656.879L12.249 10H3V9Zm0 3v7a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-7H3Z" clipRule="evenodd" />
      </svg>
    ),
  },
];

function ExpertisePage() {
  const { t } = useTranslation();
  const [active, setActive] = useState("uno"); // Default active item
  const activeItem = useMemo(
    () => expertiseItems.find((item) => item.anchor === active) || expertiseItems[0],
    [active]
  );
  
  const title = t(`expertise.${activeItem.i18nKey}.title`);
  const description = t(`expertise.${activeItem.i18nKey}.description`);

  return (
    <>
      <div className="text-2xl text-white font-mono mb-6 mx-2 text-center">// {title}</div>

      <div className="flex flex-col md:flex-row w-full justify-center relative gap-4">

        {/* ===== LEFT COLUMN ===== */}
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-end order-1 px-3 sm:px-0">
          {expertiseItems
            .filter((item) => item.side === "left")
            .map((item) => (
              <ExpertiseButton
                key={item.anchor}
                side="left"
                anchor={item.anchor}
                active={active}
                setActive={setActive}
                label={t(`expertise.${item.i18nKey}.short_label`)}
                icon={item.icon}
              />
            ))}
        </div>

        {/* ===== CENTER CONTENT ===== */}
        <div className="w-full md:w-1/2 lg:w-1/3 order-3 md:order-2">
          <div className="text-md text-gray-200 p-4 min-h-[200px]">
            <TypingText key={description} speed={10} text={description} />
          </div>
        </div>

        {/* ===== RIGHT COLUMN ===== */}
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-start order-2 md:order-3 px-3 sm:px-0">
          {expertiseItems
            .filter((item) => item.side === "right")
            .map((item) => (
              <ExpertiseButton
                key={item.anchor}
                side="right"
                anchor={item.anchor}
                active={active}
                setActive={setActive}
                label={t(`expertise.${item.i18nKey}.short_label`)}
                icon={item.icon}
              />
            ))}
        </div>

      </div>
    </>
  );
}

export default ExpertisePage;