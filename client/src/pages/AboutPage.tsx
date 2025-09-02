import { useTranslation } from "react-i18next";
import ProfilePicture from "../components/ProfilePicture";
import TypingText from "../components/TypingText";

function AboutPage() {

  const { t } = useTranslation();
  const { line1, line2, line3 } = t("about", { returnObjects: true }) as { line1: string; line2: string; line3: string };

  return (
    <>
      <div className="p-4 px-8 flex flex-col">
        <TypingText key={line1} speed={10} fontSize="medium" text={ line1 } />

        {/* This is the main container for the picture and the rest of the text */}
        <div className="flex flex-col md:flex-row md:items-start gap-8 mt-6">

          {/* ===== TEXT CONTAINER ===== */}
          <div className="w-full md:w-7/12">
            <TypingText key={line2} speed={10} fontSize="medium" text={ line2 } />
            <div className="my-4" />
            <TypingText key={line3} speed={10} fontSize="medium" text={ line3 } />
          </div>
          {/* ===== PROFILE PICTURE CONTAINER ===== */}
          <div className="w-full md:w-5/12">
            <ProfilePicture filename="nicolás-s.jpg" />
          </div>

        </div>
      </div>
    </>
  )
}

export default AboutPage;