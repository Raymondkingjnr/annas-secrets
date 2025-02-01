"use client";
import { useEffect, useState } from "react";

type TypingEffectProps = {
  text: string;
  speed: number;
};

const TypingEffect = ({ text, speed }: TypingEffectProps) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      // Blinking cursor effect after typing is done
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500);

      return () => clearInterval(cursorInterval);
    }
  }, [currentIndex, text, speed]);

  return (
    <span>
      {displayText}
      <span style={{ opacity: showCursor ? 1 : 0 }}>|</span>
    </span>
  );
};

export default TypingEffect;
