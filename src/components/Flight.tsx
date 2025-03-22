import { useRef } from "react";

interface FlightProps {
  readonly flightLetters: readonly string[];
  readonly flightsCount: number;
  onAnimationEnd: () => void;
}

export default function Flights({
  flightLetters,
  flightsCount,
  onAnimationEnd,
}: Readonly<FlightProps>) {
  const completedAnimationsRef = useRef(0);

  const handleAnimationEnd = () => {
    completedAnimationsRef.current += 1;

    if (completedAnimationsRef.current === 50) {
      onAnimationEnd();
    }
  };

  const letterStyle = {
    backgroundColor: "#4d4d4d",
    color: "yellow",
    flex: 1,
    alignContent: "center",
    textAlign: "center" as const,
    fontWeight: "bold",
    border: "2px solid black",
    animation: `rotate 0.5s ease-in-out`,
    animationDirection: "alternate-reverse",
  };

  const keyframesStyle = `
      @keyframes rotate {
        0% { transform: rotateX(0);color: yellow; }
        50% { transform: rotateX(180deg); color:#4d4d4d; }
        100% { transform: rotateX(360deg); color:#yellow; }
      }
    `;

  return (
    <>
      <style>{keyframesStyle}</style>
      {flightLetters.map((item, index) => (
        <div
          style={{
            ...letterStyle,
            height: `calc(70vh / ${flightsCount})`,
            fontSize: `calc(80vw / ${flightLetters.length})`,
            animationDuration: `${Math.random() * 2 + 2}s`,
            animationIterationCount: `${Math.floor(Math.random() * 3) + 2}`,
            animationDelay: "-0.5s",
          }}
          key={index}
          onAnimationEnd={handleAnimationEnd}
        >
          {item}
        </div>
      ))}
    </>
  );
}
