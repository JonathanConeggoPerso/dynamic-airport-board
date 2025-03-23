import { useCallback, useEffect, useState } from "react";
import Flight from "./Flight";

interface FlightsProps {
  flights: string;
  videoPlayed: boolean;
}

interface FlightInformations {
  letters: string[];
  state: "animating" | "animated" | "waiting";
}

export default function Flights({ flights, videoPlayed }: FlightsProps) {
  const [parsedFlights, setParsedFlights] = useState<FlightInformations[]>([]);

  const boardStyle = {
    backgroundColor: "black",
    height: "100%",
  };

  const flightStyle = {
    display: "flex",
    width: "100%",
  };

  const formatFlightLine = (line: string) => {
    return line.padEnd(65).split("");
  };

  const animateFlight = useCallback(
    (flightIndex: number) => {
      const flight = parsedFlights[flightIndex];
      if (!flight) return;
      parsedFlights[flightIndex] = { ...flight, state: "animating" };
      setParsedFlights([...parsedFlights]);
    },
    [parsedFlights]
  );

  const handleAnimationEnd = (flightIndex: number) => {
    const flight = parsedFlights[flightIndex];
    parsedFlights[flightIndex] = { ...flight, state: "animated" };
    setParsedFlights([...parsedFlights]);
  };

  useEffect(() => {
    if (!parsedFlights.find((flight) => flight.state === "animating")) {
      const firstFlightWaitingIndex = parsedFlights.findIndex(
        (flight) => flight.state === "waiting"
      );
      if (firstFlightWaitingIndex !== -1)
        animateFlight(firstFlightWaitingIndex);
    }
    // if (parsedFlights[0]?.state === "waiting") animateFlight(0);
    // else if (!parsedFlights.find((flight) => flight.state === "animating")) {
    //   const lastAnimatedIndex = parsedFlights
    //     .map((flight) => flight.state)
    //     .lastIndexOf("animated");
    //   animateFlight(lastAnimatedIndex + 1);
    // }
  }, [animateFlight, parsedFlights]);

  useEffect(() => {
    setParsedFlights(
      flights
        .trim()
        .split("\n")
        .map((line: string) => {
          return {
            letters: formatFlightLine(line),
            state: "waiting",
          };
        })
    );
  }, [flights, setParsedFlights]);

  useEffect(() => {
    if (videoPlayed) {
      const weddingFlightIndex = parsedFlights.findIndex((flight) =>
        flight.letters.join("").includes("ALLEE DE MAROLLES")
      );
      const weddingFlight = parsedFlights[weddingFlightIndex];
      console.log("bef", parsedFlights);
      if (weddingFlight) {
        parsedFlights[weddingFlightIndex] = {
          letters: formatFlightLine(
            weddingFlight.letters.join("").replace("EMBARQUEMENT", "EN COURS")
          ),
          state: "waiting",
        };
      }
      console.log("aft", parsedFlights);

      setParsedFlights([...parsedFlights]);
    }
  }, [videoPlayed]);

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
