"use client";

import { useKnockFeed, useNotificationStore } from "@knocklabs/react";
import { useEffect, useMemo, useState } from "react";
import Flights from "./Flights";

export default function Board() {
  const { feedClient } = useKnockFeed();
  const { items, metadata } = useNotificationStore(feedClient);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoPlayed, setVideoPlayed] = useState(false);

  const flights = useMemo(
    () => `
08:00  MUNICH                           AF1234  B01  A L'HEURE
09:30  ATHENES                          BA4567  D35  A L'HEURE
11:00  NEW-YORK                         DL7890  C03  A L'HEURE
17:45  LISBONNE                         SU9012  ---  ANNULE
12:45  COPENHAGUE                       JL0123  D04  A L'HEURE
14:00  ALLEE DE MAROLLES                NJ3150  A25  EMBARQUEMENT
14:30  DOLE                             QF3456  B05  A L'HEURE
17:45  MONTREAL                         SU9012  B21  RETARDE
16:00  EPINAL                           LH6789  D06  A L'HEURE
17:45  BIARRITZ                         SU9012  C07  A L'HEURE`,
    []
  );

  const titleStyle = {
    fontSize: "3em",
    color: "yellow",
    margin: "20px",
    position: "absolute" as const,
    top: "0",
    left: "0",
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
          case "launch-jingle": {
            const audio = new Audio("./airport-call.mp3");
            audio.play();
            break;
          }
          case "launch-video": {
            setVideoPlaying(true);
            break;
          }
        }
        feedClient.markAsArchived(item);
      });
    }
  }, [feedClient, items, metadata]);

  const onVideoEnd = () => {
    setVideoPlaying(false);
    setVideoPlayed(true);
  };

  return (
    <>
      {videoPlaying && (
        <video
          autoPlay
          controls
          src="./SecurityVideos.mp4"
          onEnded={onVideoEnd}
        ></video>
      )}
      <div style={{ visibility: videoPlaying ? "hidden" : "visible" }}>
        <h1 style={titleStyle}>Prochains départs</h1>
        <Flights flights={flights} videoPlayed={videoPlayed} />
      </div>
    </>
  );
}
