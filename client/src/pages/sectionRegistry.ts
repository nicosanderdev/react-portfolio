import type { ComponentType } from "react";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import ExperiencePage from "./ExperiencePage";
import ExpertisePage from "./ExpertisePage";
import HowIBuildPage from "./HowIBuildPage";

export type PortfolioSectionId =
  | "about"
  | "how-i-build"
  | "experience"
  | "expertise"
  | "contact";

export type PortfolioSection = {
  id: PortfolioSectionId;
  anchor: string;
  menuKey: string;
  headerKey: string;
  Page: ComponentType;
};

export const DEFAULT_SECTION_ID: PortfolioSectionId = "about";

export const PORTFOLIO_SECTIONS: readonly PortfolioSection[] = [
  {
    id: "about",
    anchor: "about",
    menuKey: "menu_about",
    headerKey: "header_about",
    Page: AboutPage,
  },
  {
    id: "how-i-build",
    anchor: "how-i-build",
    menuKey: "menu_how_i_build",
    headerKey: "header_how_i_build",
    Page: HowIBuildPage,
  },
  {
    id: "experience",
    anchor: "experience",
    menuKey: "menu_experience",
    headerKey: "header_experience",
    Page: ExperiencePage,
  },
  {
    id: "expertise",
    anchor: "expertise",
    menuKey: "menu_expertise",
    headerKey: "header_expertise",
    Page: ExpertisePage,
  },
  {
    id: "contact",
    anchor: "contact",
    menuKey: "menu_contact",
    headerKey: "header_contact",
    Page: ContactPage,
  },
] as const;

export function getSectionById(id: string): PortfolioSection {
  return (
    PORTFOLIO_SECTIONS.find((section) => section.id === id) ??
    PORTFOLIO_SECTIONS.find((section) => section.id === DEFAULT_SECTION_ID)!
  );
}
