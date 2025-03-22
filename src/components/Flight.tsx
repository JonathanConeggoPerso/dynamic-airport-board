interface FlightProps {
  flightLetters: string[];
  flightsCount: number;
  flightIndex: number;
}

export default function Flights({
  flightLetters,
  flightsCount,
  flightIndex,
}: FlightProps) {
  const letterStyle = {
    backgroundColor: "#4d4d4d",
    color: "yellow",
    flex: 1,
    alignContent: "center",
    textAlign: "center" as const,
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
          }}
          key={index}
        >
          {item}
        </div>
      ))}
    </>
  );
}
