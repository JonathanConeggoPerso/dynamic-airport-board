import { useRef } from "react";
import FlightLetter from "./FlightLetter";

interface FlightProps {
  readonly flightLetters: readonly string[];
  onAnimationEnd: () => void;
}

export default function Flight({
  flightLetters,
  onAnimationEnd,
}: Readonly<FlightProps>) {
  const completedAnimationsRef = useRef(0);

  const handleAnimationEnd = () => {
    completedAnimationsRef.current += 1;

    if (completedAnimationsRef.current === 50) {
      onAnimationEnd();
    }
  };

  return (
    <>
      {flightLetters.map((item, index) => (
        <FlightLetter
          key={index}
          letter={item}
          onAnimationEnd={handleAnimationEnd}
        ></FlightLetter>
      ))}
    </>
  );
}
