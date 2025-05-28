import { useState } from "react";
import ExpMainContentIcon from "../components/Expertise/ExpMainContentIcon";
import TypingText from "../components/TypingText";

function ExpertisePage()
{
    const [active, setActive] = useState("uno");

    const renderComponent = () => {
        switch (active) {
            case "uno":
                return  <>
                    <TypingText key={active} speed={10} text="Build powerful, scalable backends. I design RESTful APIs using ASP.NET Core, focusing on performance, security, and maintainability." />
                </>
            case "dos":
                return  <>
                    <TypingText key={active} speed={10} text="Fast, interactive user interfaces. I create dynamic, modern UIs with React, emphasizing responsiveness and clean component architecture." />
                </>
            case "tres":
                return  <>
                    <TypingText key={active} speed={10} text="Robust database integration. I use EF Core to handle data access and migrations, and I design SQL schemas for long-term reliability." />
                </>
            case "cuatro":
                return  <>
                    <TypingText key={active} speed={10} text="Secure user access. I implement Identity, JWT tokens, and role-based access control for secure, scalable applications." />
                </>
            case "cinco":
                return  <>
                    <TypingText key={active} speed={10} text="Smooth backend-frontend workflows. I ensure APIs and UI are seamlessly integrated, using tools like Axios, Fetch, or SignalR when needed." />
                </>
            default:
                return  <>
                    <TypingText key={active} speed={10} text="Maintainable architecture. I follow clean architecture principles and organize codebases for team collaboration and long-term growth." />
                </>
        }
    }

    const getTitle = () => {
        switch (active) {
            case "uno": 
                return "ASP.NET Core API Development";
            case "dos":
                return "React Frontend Development";
            case "tres":
                return "SQL & Entity Framework Core";
            case "cuatro":
                return "Authentication & Authorization";
            case "cinco":
                return "Full-Stack Integration";
            default:
                return "Clean Code & Project Structure";
        }       
    }

    return (
         <>
            <div className="text-2xl text-white mb-4 mx-2">{getTitle()}</div>
            <div className="flex flex-col sm:flex-row w-full justify-center relative">
                <div className="sm:flex-1/4 order-1 flex flex-row sm:flex-col items-center justify-center">
                    <ExpMainContentIcon
                        anchor="uno" active={active} setActive={setActive}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1M5 12h14M5 12a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1m-2 3h.01M14 15h.01M17 9h.01M14 9h.01"/>
                        </svg>}
                    />
                    <ExpMainContentIcon
                        anchor="dos" active={active} setActive={setActive}
                        icon={ <svg fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14"/>
                        </svg>}
                    />
                    <ExpMainContentIcon
                        anchor="tres" active={active} setActive={setActive}
                        icon={ <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 7.205c4.418 0 8-1.165 8-2.602C20 3.165 16.418 2 12 2S4 3.165 4 4.603c0 1.437 3.582 2.602 8 2.602ZM12 22c4.963 0 8-1.686 8-2.603v-4.404c-.052.032-.112.06-.165.09a7.75 7.75 0 0 1-.745.387c-.193.088-.394.173-.6.253-.063.024-.124.05-.189.073a18.934 18.934 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.073a10.143 10.143 0 0 1-.852-.373 7.75 7.75 0 0 1-.493-.267c-.053-.03-.113-.058-.165-.09v4.404C4 20.315 7.037 22 12 22Zm7.09-13.928a9.91 9.91 0 0 1-.6.253c-.063.025-.124.05-.189.074a18.935 18.935 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.074a10.163 10.163 0 0 1-.852-.372 7.816 7.816 0 0 1-.493-.268c-.055-.03-.115-.058-.167-.09V12c0 .917 3.037 2.603 8 2.603s8-1.686 8-2.603V7.596c-.052.031-.112.059-.165.09a7.816 7.816 0 0 1-.745.386Z"/>
                        </svg>}
                    />
                </div>
                <div className="sm:flex-1/2 order-3 sm:order-2 justify-center">
                    <div className="text-md text-white p-6">
                        {renderComponent()}
                    </div>
                </div>
                <div className="sm:flex-1/4 order-2 sm:order-3 flex flex-row sm:flex-col items-center justify-center">
                    <ExpMainContentIcon
                        anchor="cuatro" active={active} setActive={setActive} dotPosition="after"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clip-rule="evenodd"/>
                        </svg>}
                    />
                    <ExpMainContentIcon
                        anchor="cinco" active={active} setActive={setActive} dotPosition="after"
                        icon={<svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3"/>
                        </svg>}
                    />
                    <ExpMainContentIcon
                        anchor="seis" active={active} setActive={setActive} dotPosition="after"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M6 5a2 2 0 0 1 2-2h4.157a2 2 0 0 1 1.656.879L15.249 6H19a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2v-5a3 3 0 0 0-3-3h-3.22l-1.14-1.682A3 3 0 0 0 9.157 6H6V5Z" clip-rule="evenodd"/>
                            <path fill-rule="evenodd" d="M3 9a2 2 0 0 1 2-2h4.157a2 2 0 0 1 1.656.879L12.249 10H3V9Zm0 3v7a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-7H3Z" clip-rule="evenodd"/>
                        </svg>
                        }
                    />
                </div>
            </div>
        </>
    );
}

export default ExpertisePage;