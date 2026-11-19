import { useEffect, useRef } from "react";
import { mount } from "../effects/brainRuntime.js";
import options from "../effects/brainOptions.json";

export default function BrainGlyphs() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let cancelled = false;
    let dispose = () => {};

    mount(el, {
      ...options,
      playback: { playing: true, timeSeconds: 0 },
    })
      .then((effect) => {
        if (cancelled) {
          effect.dispose();
          return;
        }
        dispose = () => effect.dispose();
      })
      .catch((error: unknown) => {
        console.error(error);
      });

    return () => {
      cancelled = true;
      dispose();
    };
  }, []);

  return <div ref={host} className="protocol-brain" aria-hidden="true" />;
}
