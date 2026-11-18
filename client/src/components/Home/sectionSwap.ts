export const SAVING_MS = 500;
export const CLOSE_MS = 200;
export const BOOT_MS = 600;
export const FLOOD_MS = 700;
export const OPEN_MS = 200;
export const LOADING_HOLD_MS = 500;

export type SwapLang = "en" | "es" | "pt";

export function swapLang(code: string): SwapLang {
  if (code.startsWith("es")) return "es";
  if (code.startsWith("pt")) return "pt";
  return "en";
}

export function savingWord(lang: SwapLang, dots: number): string {
  const word = lang === "es" ? "guardando" : lang === "pt" ? "salvando" : "saving";
  let marks = "";
  for (let i = 0; i < dots; i++) marks += ".";
  return word + marks;
}

export function introLines(lang: SwapLang, id: string): string[] {
  const path = `~/portfolio/${id}`;
  if (lang === "es") {
    return [`> abrir ${path}`, `> enlazar section.${id}`, "> reservar pane"];
  }
  if (lang === "pt") {
    return [`> abrir ${path}`, `> ligar section.${id}`, "> reservar pane"];
  }
  return [`> open ${path}`, `> link section.${id}`, "> alloc pane"];
}

export function floodLines(id: string): string[] {
  const pool = [
    `open  src/pages/${id}.tsx`,
    "read  src/components/TypingText.tsx",
    "stat  src/i18n.js",
    `link  ~/portfolio/${id}`,
    "bind  section-title",
    "bind  content-pane",
    "ok    assets/fonts/ShareTechMono-Regular.ttf",
    "cmp   swap-item --i=0",
    "cmp   swap-item --i=1",
    "cmp   swap-item --i=2",
    `map   header.${id}`,
    `eval  menu-btn[data-id=${id}]`,
    `load  chunk ${id}.pane`,
    "use   emerald #34d399",
    "pipe  stdout >> pane",
    "chk   border 2px solid var(--emerald)",
    "alloc buffer 4096",
    "mmap  content-col 60%",
    "push  frame program-window",
    `done  preload ${id}`,
  ];
  const lines: string[] = [];
  for (let i = 0; i < 40; i++) {
    lines.push(`${pool[i % pool.length]}  [${i + 1}]`);
  }
  return lines;
}
