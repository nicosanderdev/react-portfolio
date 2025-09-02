// Define the type to include the new 'isLast' prop
type ExperienceItem = { 
    years: string; 
    company: string; 
    text: string;
    isLast?: boolean; // Optional boolean prop
}

function ExperienceContent({ years, company, text, isLast = false }: ExperienceItem) {
    return (
        // Each item is a flex container. 'relative' is crucial for positioning the timeline elements.
        <div className="relative pl-8 sm:pl-12 pb-12">
            
            {!isLast && (
                <div className="absolute left-[9px] sm:left-[25px] top-2 h-full w-0.5 bg-emerald-800"></div>
            )}
            
            <div className="absolute left-0 sm:left-4 top-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 ring-2 ring-gray-200" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <h3 className="text-xl font-bold text-emerald-400">{company}</h3>
                <p className="text-sm font-mono text-gray-400 mt-1 sm:mt-0">{years}</p>
            </div>
            <p className="mt-3 text-base text-gray-300 leading-relaxed">
                {text}
            </p>
        </div>
    );
}

export default ExperienceContent;