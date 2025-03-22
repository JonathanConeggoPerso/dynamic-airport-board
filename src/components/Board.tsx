"use client";

import { useKnockFeed, useNotificationStore } from "@knocklabs/react";
import { useEffect, useMemo } from "react";
import Flights from "./Flights";

export default function Board() {
  const { feedClient } = useKnockFeed();
  const { items, metadata } = useNotificationStore(feedClient);
  const flights = useMemo(
    () => `
08:00  MUNICH                           AF1234  B01  A L'HEURE
09:30  ATHENES                          BA4567  D35  A L'HEURE
11:00  NEW-YORK                         DL7890  C03  A L'HEURE
17:45  LISBONNE                         SU9012  ---  ANNULE
12:45  COPENHAGUE                       JL0123  D04  A L'HEURE
19:30  ALLEE DE MAROLLES                NJ3150  A25  EMBARQUEMENT
14:30  DOLE                             QF3456  B05  A L'HEURE
17:45  MONTREAL                         SU9012  B21  RETARDE
16:00  EPINAL                           LH6789  D06  A L'HEURE
17:45  BIARRITZ                         SU9012  C07  A L'HEURE`,
    []
  );

  useEffect(() => {
    feedClient.fetch();
  }, [feedClient]);

  useEffect(() => {
    if (items.length > 0) {
      const launchJingle = items.find(
        (item) => item.data?.event_type === "launch-jingle"
      );
      if (launchJingle) {
        const audio = new Audio("./airport-call.mp3");
        audio.play();
        feedClient.markAsArchived(launchJingle);
      }
    }
  }, [items, metadata]);

  return <Flights flights={flights} />;
}
