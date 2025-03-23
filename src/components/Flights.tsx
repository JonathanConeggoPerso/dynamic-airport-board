import { useEffect, useState } from "react";
import Flight from "./Flight";

interface FlightsProps {
  flights: string;
}

interface FlightInformations {
  letters: string[];
  state: "animating" | "animated" | "waiting";
}

export default function Flights({ flights }: FlightsProps) {
  const [parsedFlights, setParsedFlights] = useState<FlightInformations[]>([]);

  const boardStyle = {
    backgroundColor: "black",
    height: "100%",
  };

  const flightStyle = {
    display: "flex",
    width: "100%",
  };

  const animateFlight = (flightIndex: number) => {
    const flight = parsedFlights[flightIndex];
    if (!flight) return;
    parsedFlights[flightIndex] = { ...flight, state: "animating" };
    setParsedFlights([...parsedFlights]);
  };

  const handleAnimationEnd = (flightIndex: number) => {
    const flight = parsedFlights[flightIndex];
    parsedFlights[flightIndex] = { ...flight, state: "animated" };
    setParsedFlights([...parsedFlights]);
  };

  useEffect(() => {
    if (parsedFlights[0]?.state === "waiting") animateFlight(0);
    else if (!parsedFlights.find((flight) => flight.state === "animating")) {
      const lastAnimatedIndex = parsedFlights
        .map((flight) => flight.state)
        .lastIndexOf("animated");
      animateFlight(lastAnimatedIndex + 1);
    }
  }, [animateFlight, parsedFlights]);

  useEffect(() => {
    setParsedFlights(
      flights
        .trim()
        .split("\n")
        .map((line: string) => {
          return {
            letters: line.padEnd(65).split(""),
            state: "waiting",
          };
        })
    );
  }, [flights, setParsedFlights]);

  return (
    <div style={boardStyle}>
      {parsedFlights.map((flight, flightIndex) => (
        <div style={flightStyle} key={flightIndex}>
          {flight.state !== "waiting" && (
            <Flight
              flightLetters={flight.letters}
              onAnimationEnd={() => handleAnimationEnd(flightIndex)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
