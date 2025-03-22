import { useEffect, useState } from "react";
import Flight from "./Flight";

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
      {parsedFlights.map((flight, flightIndex) => (
        <div style={flightStyle} key={flightIndex}>
          <Flight
            flightLetters={flight}
            flightsCount={parsedFlights.length}
            flightIndex={flightIndex}
          />
        </div>
      ))}
    </div>
  );
}
