"use client";

import { useKnockFeed, useNotificationStore } from "@knocklabs/react";
import { useEffect } from "react";
import Flights from "./Flights";

export default function Board() {
  const { feedClient } = useKnockFeed();
  const { items, metadata } = useNotificationStore(feedClient);

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

  return <Flights />;
}
