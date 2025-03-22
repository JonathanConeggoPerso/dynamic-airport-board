import { useEffect, useState } from "react";

interface FlightsProps {
  flights: string;
}

export default function Flights({ flights }: FlightsProps) {
  const [parsedFlights, setParsedFlights] = useState<string[][]>([]);

  const boardStyle = {
    backgroundColor: "black",
    height: "100%",
  };

  const flightStyle = {
    display: "flex",
    width: "100%",
  };

  const letterStyle = {
    backgroundColor: "#4d4d4d",
    color: "yellow",
    flex: 1,
    fontWeight: "bold",
    border: "2px solid black",
    animation: `rotate 1s ease-in-out`,
    animationIterationCount: "infinite",
  };

  const keyframesStyle = `
      @keyframes rotate {
        0% { transform: rotateX(0); }
        100% { transform: rotateX(360deg); }
      }
    `;

  useEffect(() => {
    setParsedFlights(
      flights
        .trim()
        .split("\n")
        .map((line: string) => line.padEnd(65).split(""))
    );
  }, [flights, setParsedFlights]);

  return (
    <div style={boardStyle}>
      <style>{keyframesStyle}</style>
      {parsedFlights.map((flight, flightIndex) => (
        <div style={flightStyle} key={flightIndex}>
          {flight.map((item, index) => (
            <div
              style={{
                ...letterStyle,
                height: `calc(70vh / ${parsedFlights.length})`,
                fontSize: `calc(80vw / ${flight.length})`,
                animationDuration: `${Math.random() * 2 + 2}s`,
                animationIterationCount: `${Math.floor(Math.random() * 3) + 2}`,
              }}
              key={index}
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
