import { useTranslation } from "react-i18next";
import ExperienceContent from "../components/Experience/ExperienceContent";

function ExperiencePage() {
    const { t } = useTranslation();
    const experiences = t('experience', { 
      returnObjects: true
     }) as Record<string, { years: string; company: string; description: string }>; // Type assertion for clarity
    
    // Sort by the 'years' property to ensure correct chronological order before reversing
    const experienceArray = Object.values(experiences)
      .sort((a, b) => a.years.localeCompare(b.years))
      .reverse();

    return (
        // Add a container to center the content and provide vertical padding
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
                Work Experience
            </h2>
            <div className="relative">
                {/* This wrapper will contain the timeline items */}
                {experienceArray.map((exp, index) => (
                    <ExperienceContent 
                        key={exp.company}
                        years={exp.years} 
                        company={exp.company} 
                        text={exp.description}
                        isLast={index === experienceArray.length - 1} // Pass a prop to know if it's the last item
                    />
                ))}
            </div>
        </div>
    );
}

export default ExperiencePage;