import { useKnockFeed, useNotificationStore } from "@knocklabs/react";
import { useCallback, useEffect, useState } from "react";
import Flight from "./Flight";

interface FlightsProps {
  readonly flights: string;
  readonly videoPlayed: boolean;
}

interface FlightInformations {
  letters: string[];
  state: "animating" | "animated" | "waiting";
}

export default function Flights({ flights, videoPlayed }: FlightsProps) {
  const [parsedFlights, setParsedFlights] = useState<FlightInformations[]>([]);
  const { feedClient } = useKnockFeed();
  const { items, metadata } = useNotificationStore(feedClient);

  const initFlights = useCallback(() => {
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
    feedClient.fetch();
  }, [feedClient]);

  useEffect(() => {
    if (items.length > 0) {
      items.forEach((item) => {
        const eventType = item.data?.event_type;
        console.log(eventType);
        switch (eventType) {
          case "reset-flights": {
            initFlights();
            feedClient.markAsArchived(item);
            break;
          }
        }
      });
    }
  }, [feedClient, items, metadata, initFlights]);

  useEffect(() => {
    if (!parsedFlights.find((flight) => flight.state === "animating")) {
      const firstFlightWaitingIndex = parsedFlights.findIndex(
        (flight) => flight.state === "waiting"
      );
      if (firstFlightWaitingIndex !== -1)
        animateFlight(firstFlightWaitingIndex);
    }
  }, [animateFlight, parsedFlights]);

  useEffect(() => {
    initFlights();
  }, [initFlights]);

  useEffect(() => {
    if (videoPlayed) {
      const weddingFlightIndex = parsedFlights.findIndex((flight) =>
        flight.letters.join("").includes("ALLEE DE MAROLLES")
      );
      const weddingFlight = parsedFlights[weddingFlightIndex];
      if (weddingFlight) {
        parsedFlights[weddingFlightIndex] = {
          letters: formatFlightLine(
            weddingFlight.letters
              .join("")
              .replace("PROCHAIN VOL", "EMBARQUEMENT")
          ),
          state: "waiting",
        };
      }

      setParsedFlights([...parsedFlights]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
