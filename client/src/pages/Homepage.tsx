import { useEffect, useState } from "react";
import LoadingBar from "./../components/LoadingBar";
import TypingText from "../components/TypingText";
import ContactPage from "./ContactPage";
import DirectoryListing from "../components/DirectoryListing";
import ConsolePulse from "../components/ConsolePlus/ConsolePulse";
import HomeButtonComponent from "../components/Home/HomeButtonComponent";
import AboutPage from "./AboutPage";
import ExpertisePage from "./ExpertisePage";
import ExperiencePage from "./ExperiencePage";

export default function Homepage() {
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState("about");

    const renderComponent = () => {
        switch (active) {
            case "about":
                return <AboutPage />;
            case "experience":
                return <ExperiencePage />;
            case "expertise":
                return <ExpertisePage />;
            default:
                return <ContactPage />;
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timeout);
    }, []);

    

    return (
        <>
        <div className="border border-gray-500 rounded shadow-lg bg-gray-900 text-emerald-400 font-mono p-6 flex flex-col w-full h-full">
             {/** windows top bar */}
            <div className="flex items-center justify-end border-b border-gray-500 pb-2">
                <div className="text-sm"><span className="font-mono"><TypingText key={active} text={`~/portfolio/${active}`}/></span></div>
            </div>

            <div className="w-full bg-gray-900 rounded border border-2 border-gray-500 p-3 mt-4 h-full">
                {/** Title */}
                <div className="bg-emerald-400 text-center p-2"><span className="text-gray-900 text-3xl font-mono w-full">Nicolás Sander</span></div>
                
                <div className="flex flex-col md:flex-row h-auto">

                    <div className="md:hidden">
                        {/** Menu - Mobile*/}
                        <nav>
                            <ul className="">
                                <div className="grid grid-cols-2 mt-4 gap-y-2">
                                    <li className="text-center">
                                        <a
                                            href="#about"
                                            onClick={() => setActive("about")}
                                        >
                                            <span className={`text-2xl font-mono ${active === "about" ? "text-gray-900 bg-emerald-400 font-bold" : "text-gray-200"
                                                }`}>[] About me</span>
                                        </a>
                                    </li>
                                    <li className="text-center">
                                        <a
                                            href="#Experience"
                                            onClick={() => setActive("experience")}
                                        >
                                            <span className={`text-2xl font-mono ${active === "experience" ? "text-gray-900 bg-emerald-400 font-bold" : "text-gray-200"
                                                }`}>[] Experience</span>

                                        </a>
                                    </li>
                                    <li className="text-center">
                                        <a
                                            href="#Expertise"
                                            onClick={() => setActive("expertise")}
                                        >
                                            <span className={`text-2xl font-mono ${active === "expertise" ? "text-gray-900 bg-emerald-400 font-bold" : "text-gray-200"
                                                }`}>[] Expertise</span>

                                        </a>
                                    </li>
                                    <li className="text-center">
                                        <a
                                            href="#Contact"
                                            onClick={() => setActive("contact")}
                                        >
                                            <span className={`text-2xl font-mono ${active === "contact" ? "text-gray-900 bg-emerald-400 font-bold" : "text-gray-200"
                                                }`}>[] Contact</span>

                                        </a>
                                    </li>
                                </div>
                            </ul>
                        </nav>
                    </div>
                    
                    <div className="hidden md:block w-[40%]">
                        {/** Menu - Desktop10*/}
                        <nav>
                            <ul className="">
                                
                                <div className="flex flex-col">
                                    <HomeButtonComponent label="About Me" anchor="about" active={active} setActive={setActive} />
                                    <HomeButtonComponent label="Expertise" anchor="expertise" active={active} setActive={setActive} />
                                    <HomeButtonComponent label="Experience" anchor="experience" active={active} setActive={setActive} />
                                    <HomeButtonComponent label="Contact" anchor="contact" active={active} setActive={setActive} />
                                </div>
                            </ul>
                        </nav>

                        <DirectoryListing />
                        <div className="hidden sm:block">
                            <ConsolePulse />
                        </div>
                    </div>

                    <div className="w-full h-full">
                        {/** TItle */}
                        <div className="border border-2 border-emerald-400 py-2 mt-6 text-center">
                            <span className="text-3xl text-gray-200 font-mono">// {active}</span>
                        </div>

                        {/** Main content */}
                        <div className="border border-2 border-emerald-400 py-6 mt-6 text-center h-full">
                            {loading && <LoadingBar onFinish={() => setLoading(false)} />}
                            {!loading && renderComponent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}