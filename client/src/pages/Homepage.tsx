import { useEffect, useState } from "react";
import LoadingBar from "./../components/LoadingBar";
import TypingText from "../components/TypingText";
import DirectoryListing from "../components/DirectoryListing";
import ConsolePulse from "../components/ConsolePlus/ConsolePulse";
import HomeButtonComponent from "../components/Home/HomeButtonComponent";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/LanguageSelector";
import {
    DEFAULT_SECTION_ID,
    getSectionById,
    PORTFOLIO_SECTIONS,
    type PortfolioSectionId,
} from "./sectionRegistry";
import HowIBuildPage from "./HowIBuildPage";

export default function Homepage() {
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState<PortfolioSectionId>(DEFAULT_SECTION_ID);
    const [isExpanded, setIsExpanded] = useState(false);

    const activeSection = getSectionById(active);
    const ActivePage = activeSection.Page;

    const { t, i18n } = useTranslation();
    const isNonEnglish = !i18n.language.startsWith("en");

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (active !== "how-i-build") {
            setIsExpanded(false);
        }
    }, [active]);

    return (
        <>
        <div className="border border-gray-500 rounded shadow-lg text-emerald-400 font-mono p-6 flex flex-col w-full lg:w-[1400px] h-full overflow-y-auto my-4">
             {/** windows top bar */}
            <div className="flex items-center flex-col sm:flex-row sm:justify-between border-b border-gray-500 pb-2">
                <LanguageSelector />
                <div className="text-sm"><span className="font-mono"><TypingText key={t(activeSection.headerKey)} text={`~/portfolio/${t(activeSection.headerKey)}`}/></span></div>
            </div>

            <div className="w-full rounded border-2 border-gray-500 p-3 mt-4 h-auto">
                {/** Title */}
                <div className="bg-emerald-400 text-center p-2"><span className="text-gray-900 text-3xl font-mono w-full">Nicolás Sander</span></div>
                
                <div className="flex flex-col md:flex-row h-auto">

                    <div
                        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out motion-reduce:transition-none ${
                            isExpanded
                                ? "max-h-0 opacity-0 pointer-events-none"
                                : "max-h-[32rem] opacity-100"
                        }`}
                        aria-hidden={isExpanded}
                    >
                        {/** Menu - Mobile*/}
                        <nav>
                            <ul className="">
                                <div className="grid grid-cols-2 mt-4 gap-y-2">
                                    {PORTFOLIO_SECTIONS.map((section) => {
                                        const showEnMarker = Boolean(section.englishOnly) && isNonEnglish;
                                        return (
                                        <li key={section.id} className="text-center">
                                            <a
                                                href={`#${section.anchor}`}
                                                onClick={() => setActive(section.id)}
                                            >
                                                <span className={`text-xl font-mono ${active === section.id ? "text-gray-900 bg-emerald-400 font-bold" : "text-gray-200"
                                                    }`}>
                                                    [] {t(section.menuKey)}
                                                    {showEnMarker && (
                                                        <span
                                                            className={`ml-1 text-xs align-super font-bold tracking-wide ${
                                                                active === section.id ? "text-gray-800" : "text-emerald-400"
                                                            }`}
                                                        >
                                                            EN
                                                        </span>
                                                    )}
                                                </span>
                                            </a>
                                        </li>
                                        );
                                    })}
                                </div>
                            </ul>
                        </nav>
                    </div>
                    
                    <div
                        className={`hidden md:block shrink-0 overflow-hidden transition-[width,opacity] duration-300 ease-out motion-reduce:transition-none ${
                            isExpanded
                                ? "w-0 opacity-0 pointer-events-none"
                                : "w-[40%] opacity-100"
                        }`}
                        aria-hidden={isExpanded}
                    >
                        {/** Menu - Desktop10*/}
                        <nav>
                            <ul className="">
                                
                                <div className="flex flex-col">
                                    {PORTFOLIO_SECTIONS.map((section) => (
                                        <HomeButtonComponent
                                            key={section.id}
                                            label={t(section.menuKey)}
                                            anchor={section.anchor}
                                            active={active}
                                            setActive={(value) => setActive(value as PortfolioSectionId)}
                                            showEnMarker={Boolean(section.englishOnly) && isNonEnglish}
                                        />
                                    ))}
                                </div>
                            </ul>
                        </nav>

                        <DirectoryListing />
                        <div className="hidden sm:block">
                            <ConsolePulse />
                        </div>
                    </div>

                    <div className="w-full min-w-0 h-full">
                        {/** TItle */}
                        <div className="border border-2 border-emerald-400 py-2 mt-6 text-center">
                            <span className="text-3xl text-gray-200 font-mono">// { t(activeSection.headerKey) }</span>
                        </div>

                        {/** Main content */}
                        <div className="border border-2 border-emerald-400 py-6 mt-6 text-center h-full">
                            {loading && <LoadingBar onFinish={() => setLoading(false)} />}
                            {!loading && active === "how-i-build" ? (
                                <HowIBuildPage
                                    isExpanded={isExpanded}
                                    onExpand={() => setIsExpanded(true)}
                                    onCollapse={() => setIsExpanded(false)}
                                />
                            ) : !loading ? (
                                <ActivePage />
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
