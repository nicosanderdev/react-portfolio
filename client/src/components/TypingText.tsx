import { useState, useEffect } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  fontSize? : string;
}

const TypingText = ({ text, speed = 30, fontSize}: TypingTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  const getFontSizeClass = (fontSize: string): string => {
    const sizeMap: Record<string, string> = {
      'sm': 'text-sm',
      'base': 'text-base',
      'lg': 'text-lg',
      'xl': 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl'
    };

    return sizeMap[fontSize] ?? 'text-xl';
  };

  const fs = getFontSizeClass(fontSize!);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return (
    <span className={`${fs} font-mono text-gray-200`}>
      {displayedText}
      <span className="inline-block w-[1ch] animate-blink">|</span>
    </span>
  );
};

export default TypingText;