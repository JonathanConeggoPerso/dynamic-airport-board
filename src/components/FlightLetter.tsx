"use client";

import { useMemo, useRef, useState } from "react";

interface FlightLetterProps {
  letter: string;
  onAnimationEnd: () => void;
}

export default function FlightLetter({
  letter,
  onAnimationEnd,
}: FlightLetterProps) {
  const letterStyle = {
    backgroundColor: "#4d4d4d",
    color: "yellow",
    flex: 1,
    alignContent: "center",
    textAlign: "center" as const,
    height: "70px",
    minWidth: "47px",
    fontSize: "2rem",
    fontWeight: "bold",
    border: "2px solid black",
    transformOrigin: "50% 50%",
    animation: `flip 0.4s linear`,
    animationIterationCount: "infinite",
    animationDirection: "alternate-reverse",
  };
  const iterationCount = useMemo(() => Math.floor(Math.random() * 10) + 5, []);
  const animationDelay = useMemo(() => Math.random(), []);
  const [currentLetter, setCurrentLetter] = useState("");
  const animationCount = useRef(0);

  const keyframesStyle = `
@keyframes flip {
  0% { transform: rotateX(0); }
  25% { color:#4d4d4d }
  50% { transform: rotateX(180deg); color:#4d4d4d }
  100% { transform: rotateX(360deg); }
}
    `;

  const handlerAnimationIterationCapture = () => {
    animationCount.current++;

    if (animationCount.current === iterationCount - 1) {
      setCurrentLetter(letter);
    } else {
      const randomLetter = /^[0-9]$/.test(letter)
        ? String.fromCharCode(48 + Math.floor(Math.random() * 10))
        : String.fromCharCode(65 + Math.floor(Math.random() * 26));
      setCurrentLetter(randomLetter);
    }
  };

  const handleAnimationEnd = () => {
    onAnimationEnd();
  };

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        style={{
          ...letterStyle,
          animationIterationCount: `${iterationCount}`,
          animationDelay: `${animationDelay}s`,
        }}
        onAnimationIteration={handlerAnimationIterationCapture}
        onAnimationEnd={handleAnimationEnd}
      >
        {currentLetter}
      </div>
    </>
  );
}
