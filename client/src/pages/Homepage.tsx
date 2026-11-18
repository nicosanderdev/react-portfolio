import { useEffect, useState } from "react";
import TypingText from "../components/TypingText";
import DirectoryListing from "../components/DirectoryListing";
import ConsolePulse from "../components/ConsolePlus/ConsolePulse";
import HomeButtonComponent from "../components/Home/HomeButtonComponent";
import "../components/Home/SectionSwap.css";
import {
    ScanBeam,
    ScanIntroOverlay,
    scanShellClassName,
    useScanIntroPhase,
} from "../components/Home/ScanIntro";
import { useSectionSwap } from "../components/Home/useSectionSwap";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/LanguageSelector";
import {
    getSectionById,
    PORTFOLIO_SECTIONS,
    type PortfolioSectionId,
} from "./sectionRegistry";
import HowIBuildPage from "./HowIBuildPage";

export default function Homepage() {
    const [isExpanded, setIsExpanded] = useState(false);
    const intro = useScanIntroPhase();
    const scanPhase = intro.phase;
    const swap = useSectionSwap(scanPhase === "done");
    const { t, i18n } = useTranslation();

    const shownSection = swap.shown ? getSectionById(swap.shown) : null;
    const ActivePage = shownSection?.Page;
    const headerPath = shownSection
        ? `~/portfolio/${t(shownSection.headerKey)}`
        : "~/portfolio";
    const isNonEnglish = !i18n.language.startsWith("en");

    useEffect(() => {
        if (swap.shown !== "how-i-build") {
            setIsExpanded(false);
        }
    }, [swap.shown]);

    return (
        <>
        <div
            className={`${scanShellClassName(scanPhase)} border border-gray-500 rounded shadow-lg text-emerald-400 font-mono p-6 flex flex-col w-full lg:w-[1400px] h-full my-4 ${
                scanPhase === "done" ? "overflow-y-auto" : "overflow-hidden"
            }`}
        >
            <ScanBeam phase={scanPhase} />
            <ScanIntroOverlay
                phase={scanPhase}
                closeBlocked={intro.closeBlocked}
                onConfirm={intro.confirm}
                onDecline={intro.decline}
            />

             {/** windows top bar */}
            <div
                className="scan-region flex items-center flex-col sm:flex-row sm:justify-between border-b border-gray-500 pb-2"
                style={{ ["--scan-i" as string]: 0 }}
            >
                <LanguageSelector />
                <div className="text-sm"><span className="font-mono"><TypingText key={headerPath} text={headerPath}/></span></div>
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
                                            active={swap.pending ?? ""}
                                            setActive={(value) => swap.request(value as PortfolioSectionId)}
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
                                            active={swap.pending ?? ""}
                                            setActive={(value) => swap.request(value as PortfolioSectionId)}
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

                    <div className={`section-swap w-full min-w-0 h-full${swap.className ? ` ${swap.className}` : ""}`}>
                        <div className="boot-log" ref={swap.bootLogRef} aria-hidden="true">
                            {swap.bootLines.map((line, index) => (
                                <div className="boot-line" key={`${index}-${line}`}>{line}</div>
                            ))}
                        </div>
                        <div className="program-window" ref={swap.windowRef}>
                            <div className="program-bar">
                                <span className="program-marks" aria-hidden="true"><i /><i /><i /></span>
                                <span className="program-title">{swap.barTitle}</span>
                            </div>
                            <div className="program-body">
                                {shownSection ? (
                                    <>
                                        <div
                                            className="scan-region border border-2 border-emerald-400 py-2 text-center"
                                            data-scan-role="section-title"
                                        >
                                            <span className="text-3xl text-gray-200 font-mono">// { t(shownSection.headerKey) }</span>
                                        </div>

                                        <div
                                            className="scan-region border border-2 border-emerald-400 py-6 mt-6 text-center h-full"
                                            data-scan-role="content-pane"
                                        >
                                            {swap.shown === "how-i-build" ? (
                                                <HowIBuildPage
                                                    isExpanded={isExpanded}
                                                    onExpand={() => setIsExpanded(true)}
                                                    onCollapse={() => setIsExpanded(false)}
                                                />
                                            ) : (
                                                ActivePage && <ActivePage />
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        className="scan-region idle-prompt"
                                        data-scan-role="content-pane"
                                    >
                                        <span aria-hidden="true">[&gt;]</span>
                                        <span>{t("idle_prompt")}</span>
                                        <span className="idle-caret" aria-hidden="true" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
