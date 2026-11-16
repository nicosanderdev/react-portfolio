import { useEffect, useState } from "react";
import TypingText from "../components/TypingText";
import DirectoryListing from "../components/DirectoryListing";
import ConsolePulse from "../components/ConsolePlus/ConsolePulse";
import HomeButtonComponent from "../components/Home/HomeButtonComponent";
import {
    ScanBeam,
    ScanIntroOverlay,
    scanShellClassName,
    useScanIntroPhase,
} from "../components/Home/ScanIntro";
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
    const [active, setActive] = useState<PortfolioSectionId>(DEFAULT_SECTION_ID);
    const [isExpanded, setIsExpanded] = useState(false);
    const scanPhase = useScanIntroPhase();

    const activeSection = getSectionById(active);
    const ActivePage = activeSection.Page;

    const { t, i18n } = useTranslation();
    const isNonEnglish = !i18n.language.startsWith("en");

    useEffect(() => {
        if (active !== "how-i-build") {
            setIsExpanded(false);
        }
    }, [active]);

    return (
        <>
        <div
            className={`${scanShellClassName(scanPhase)} border border-gray-500 rounded shadow-lg text-emerald-400 font-mono p-6 flex flex-col w-full lg:w-[1400px] h-full my-4 ${
                scanPhase === "done" ? "overflow-y-auto" : "overflow-hidden"
            }`}
        >
            <ScanBeam phase={scanPhase} />
            <ScanIntroOverlay phase={scanPhase} />

             {/** windows top bar */}
            <div
                className="scan-region flex items-center flex-col sm:flex-row sm:justify-between border-b border-gray-500 pb-2"
                style={{ ["--scan-i" as string]: 0 }}
            >
                <LanguageSelector />
                <div className="text-sm"><span className="font-mono"><TypingText key={t(activeSection.headerKey)} text={`~/portfolio/${t(activeSection.headerKey)}`}/></span></div>
            </div>

            <div className="w-full rounded border-2 border-gray-500 p-3 mt-4 h-auto">
                {/** Title */}
                <div
                    className="scan-region bg-emerald-400 text-center p-2"
                    style={{ ["--scan-i" as string]: 1 }}
                >
                    <span className="text-gray-900 text-3xl font-mono w-full">Nicolás Sander</span>
                </div>
                
                <div className="flex flex-col md:flex-row h-auto">

                    <div
                        className={`scan-region md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out motion-reduce:transition-none ${
                            isExpanded
                                ? "max-h-0 opacity-0 pointer-events-none"
                                : "max-h-[32rem] opacity-100"
                        }`}
                        style={{ ["--scan-i" as string]: 2 }}
                        aria-hidden={isExpanded}
                    >
                        {/** Menu - Mobile*/}
                        <nav aria-label="Homepage menu">
                            <ul className="grid grid-cols-2 mx-0 mb-0 mt-4 gap-2 list-none p-0">
                                {PORTFOLIO_SECTIONS.map((section) => (
                                    <li key={section.id}>
                                        <HomeButtonComponent
                                            label={t(section.menuKey)}
                                            anchor={section.anchor}
                                            active={active}
                                            setActive={(value) => setActive(value as PortfolioSectionId)}
                                            showEnMarker={Boolean(section.englishOnly) && isNonEnglish}
                                            compact
                                        />
                                    </li>
                                ))}
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
                        {/** Menu - Desktop */}
                        <nav
                            className="scan-region"
                            style={{ ["--scan-i" as string]: 2 }}
                            aria-label="Homepage menu"
                        >
                            <ul className="flex flex-col gap-6 pe-6 mx-0 mb-0 mt-6 list-none p-0">
                                {PORTFOLIO_SECTIONS.map((section) => (
                                    <li key={section.id}>
                                        <HomeButtonComponent
                                            label={t(section.menuKey)}
                                            anchor={section.anchor}
                                            active={active}
                                            setActive={(value) => setActive(value as PortfolioSectionId)}
                                            showEnMarker={Boolean(section.englishOnly) && isNonEnglish}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className="scan-region" style={{ ["--scan-i" as string]: 3 }}>
                            <DirectoryListing />
                        </div>
                        <div className="scan-region hidden sm:block" style={{ ["--scan-i" as string]: 4 }}>
                            <ConsolePulse />
                        </div>
                    </div>

                    <div className="w-full min-w-0 h-full">
                        {/** TItle */}
                        <div
                            className="scan-region border border-2 border-emerald-400 py-2 mt-6 text-center"
                            data-scan-role="section-title"
                        >
                            <span className="text-3xl text-gray-200 font-mono">// { t(activeSection.headerKey) }</span>
                        </div>

                        {/** Main content */}
                        <div
                            className="scan-region border border-2 border-emerald-400 py-6 mt-6 text-center h-full"
                            data-scan-role="content-pane"
                        >
                            {active === "how-i-build" ? (
                                <HowIBuildPage
                                    isExpanded={isExpanded}
                                    onExpand={() => setIsExpanded(true)}
                                    onCollapse={() => setIsExpanded(false)}
                                />
                            ) : (
                                <ActivePage />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
