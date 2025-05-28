import TypingText from "../components/TypingText";

function AboutPage() {
    return (
        <>
            <div className="p-4 px-8">
                <TypingText speed={10} fontSize="base" text="Hi! I’m a full-stack web developer with a strong focus on ASP.NET Core and React. Over the past 3+ years, I’ve helped businesses and teams build fast, scalable, and maintainable web applications — from backend APIs to modern frontends."/>
                <div className="my-2" />
                <TypingText speed={10} fontSize="base" text="I’m passionate about writing clean code, building intuitive user interfaces, and solving real-world problems through software. Whether you're launching a new product or need help improving an existing app, I can support you with both hands-on development and technical guidance."/>
                <div className="my-2" />
                <TypingText speed={10} fontSize="base" text="I work with a sharp eye for detail, a strong sense of responsibility, and a deep respect for deadlines. If you're looking for a developer who can combine solid engineering with clear communication, I’d love to hear about your project."/>
            </div>
        </>
    )
}

export default AboutPage;