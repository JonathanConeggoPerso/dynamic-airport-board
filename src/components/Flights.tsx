export const flights = `
08:00  MUNICH                           AF1234  B01  A L'HEURE
09:30  ATHENES                          BA4567  D35  A L'HEURE
11:00  NEW-YORK                         DL7890  C03  A L'HEURE
17:45  LISBONNE                         SU9012  ---  ANNULE
12:45  COPENHAGUE                       JL0123  D04  A L'HEURE
19:30  ALLEE DE MAROLLES                NJ3150  A25  EMBARQUEMENT
14:30  DOLE                             QF3456  B05  A L'HEURE
17:45  MONTREAL                         SU9012  B21  RETARDE
16:00  EPINAL                           LH6789  D06  A L'HEURE
17:45  BIARRITZ                         SU9012  C07  A L'HEURE`;

export const parsedFlights = flights
  .trim()
  .split("\n")
  .map((line) => line.padEnd(65).split(""));

export default function Flights() {
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
    textAlign: "center",
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
