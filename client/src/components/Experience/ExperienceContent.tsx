type ExperienceItem = { years: string; company: string; text: string; }

function ExperienceContent(info : ExperienceItem)
 {
    return (
        <>
            <div className="flex flex-col mb-5">
                <div className="text-xl text-white">{info.years}</div>
                <div className="text-xl text-white">{info.company}</div>
                <div className="text-base text-white">{info.text}</div>
            </div>
        </>
    );
}

export default ExperienceContent;