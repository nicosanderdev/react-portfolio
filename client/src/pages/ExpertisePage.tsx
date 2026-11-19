import { cloneElement, useLayoutEffect, useRef, useState, type ReactElement } from "react";
import { useTranslation } from "react-i18next";
import TypingText from "../components/TypingText";
import "./ExpertisePage.css";

const expertiseItems: { anchor: string; i18nKey: string; icon: ReactElement }[] = [
  {
    anchor: "uno",
    i18nKey: "backend_dev",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1M5 12h14M5 12a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1m-2 3h.01M14 15h.01M17 9h.01M14 9h.01" />
      </svg>
    ),
  },
  {
    anchor: "dos",
    i18nKey: "frontend_dev",
    icon: (
      <svg fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14" />
      </svg>
    ),
  },
  {
    anchor: "tres",
    i18nKey: "databases",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 7.205c4.418 0 8-1.165 8-2.602C20 3.165 16.418 2 12 2S4 3.165 4 4.603c0 1.437 3.582 2.602 8 2.602ZM12 22c4.963 0 8-1.686 8-2.603v-4.404c-.052.032-.112.06-.165.09a7.75 7.75 0 0 1-.745.387c-.193.088-.394.173-.6.253-.063.024-.124.05-.189.073a18.934 18.934 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.073a10.143 10.143 0 0 1-.852-.373 7.75 7.75 0 0 1-.493-.267c-.053-.03-.113-.058-.165-.09v4.404C4 20.315 7.037 22 12 22Zm7.09-13.928a9.91 9.91 0 0 1-.6.253c-.063.025-.124.05-.189.074a18.935 18.935 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.074a10.163 10.163 0 0 1-.852-.372 7.816 7.816 0 0 1-.493-.268c-.055-.03-.115-.058-.167-.09V12c0 .917 3.037 2.603 8 2.603s8-1.686 8-2.603V7.596c-.052.031-.112.059-.165.09a7.816 7.816 0 0 1-.745.386Z" />
      </svg>
    ),
  },
  {
    anchor: "cuatro",
    i18nKey: "security",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    anchor: "cinco",
    i18nKey: "api_design",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3" />
      </svg>
    ),
  },
  {
    anchor: "seis",
    i18nKey: "dev_ops",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M6 5a2 2 0 0 1 2-2h4.157a2 2 0 0 1 1.656.879L15.249 6H19a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2v-5a3 3 0 0 0-3-3h-3.22l-1.14-1.682A3 3 0 0 0 9.157 6H6V5Z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M3 9a2 2 0 0 1 2-2h4.157a2 2 0 0 1 1.656.879L12.249 10H3V9Zm0 3v7a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-7H3Z" clipRule="evenodd" />
      </svg>
    ),
  },
];

function paintedExtent(svg: SVGSVGElement): number {
  const paths = [...svg.querySelectorAll("path")];
  if (paths.length === 0) return 1;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let stroke = 0;
  for (const path of paths) {
    const box = path.getBBox();
    minX = Math.min(minX, box.x);
    minY = Math.min(minY, box.y);
    maxX = Math.max(maxX, box.x + box.width);
    maxY = Math.max(maxY, box.y + box.height);
    if (path.getAttribute("stroke") && path.getAttribute("stroke") !== "none") {
      stroke = Math.max(stroke, Number(path.getAttribute("stroke-width")) || 1);
    }
  }
  return Math.max(maxX - minX, maxY - minY) + stroke;
}

function ExpertisePage() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [iconWidth, setIconWidth] = useState(0);
  const [iconSlot, setIconSlot] = useState(0);
  const labelRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const lastIndex = expertiseItems.length - 1;
  const activeItem = expertiseItems[index];
  const frontendLabel = t("expertise.frontend_dev.short_label");
  const description = t(`expertise.${activeItem.i18nKey}.description`);

  useLayoutEffect(() => {
    const label = labelRef.current;
    const host = measureRef.current;
    if (!label || !host) return;
    const extent = (key: string) => {
      const svg = host.querySelector<SVGSVGElement>(`[data-icon="${key}"] svg`);
      return svg ? paintedExtent(svg) : 0;
    };
    const measure = () => {
      const reference = extent("frontend_dev");
      const current = extent(activeItem.i18nKey);
      const labelWidth = label.getBoundingClientRect().width;
      if (!reference || !current || !labelWidth) return;
      setIconSlot(labelWidth);
      setIconWidth(labelWidth * (reference / current));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(label);
    return () => observer.disconnect();
  }, [frontendLabel, activeItem.i18nKey]);

  return (
    <article className="expertise-console">
      <div className="expertise-body">
        <div
          className="expertise-icon-slot"
          style={{ height: iconSlot || undefined }}
        >
          <div
            className="expertise-icon"
            style={{ width: iconWidth || undefined }}
            aria-hidden="true"
          >
            {activeItem.icon}
          </div>
        </div>
        <div className="expertise-copy">
          {expertiseItems.map((item) => (
            <p key={item.anchor} className="expertise-copy-sizer" aria-hidden="true">
              {t(`expertise.${item.i18nKey}.description`)}
              <span className="expertise-copy-caret" />
            </p>
          ))}
          <p className="expertise-copy-live">
            <TypingText key={description} speed={10} text={description} />
          </p>
        </div>
      </div>
      <div className="expertise-icon-measure" ref={measureRef} aria-hidden="true">
        {expertiseItems.map((item) => (
          <div key={item.anchor} data-icon={item.i18nKey}>
            {cloneElement(item.icon)}
          </div>
        ))}
      </div>

      <div className="expertise-pager">
        <button
          type="button"
          className="expertise-arrow"
          aria-label="previous"
          disabled={index === 0}
          onClick={() => setIndex((current) => Math.max(0, current - 1))}
        >
          &lt;
        </button>
        <div className="expertise-viewport" aria-live="polite">
          <div
            className="expertise-track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {expertiseItems.map((item, itemIndex) => (
              <div className="expertise-pager-slide" key={item.anchor}>
                <span
                  className="expertise-pager-label"
                  ref={item.i18nKey === "frontend_dev" ? labelRef : undefined}
                  aria-hidden={itemIndex !== index}
                >
                  <span aria-hidden="true">[X] </span>
                  {t(`expertise.${item.i18nKey}.short_label`)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="expertise-arrow"
          aria-label="next"
          disabled={index === lastIndex}
          onClick={() => setIndex((current) => Math.min(lastIndex, current + 1))}
        >
          &gt;
        </button>
      </div>
    </article>
  );
}

export default ExpertisePage;
