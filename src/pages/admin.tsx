"use client";

import { useState } from "react";

export default function Admin() {
  const [loading, setLoading] = useState(false);

  const handleLaunchNotification = async (eventType: string) => {
    setLoading(true);
    await fetch("/api/trigger-knock", {
      method: "POST",
      body: JSON.stringify({ eventType: eventType }),
    });
    setLoading(false);
  };

  return (
    <>
      <h1>Admin Page</h1>
      <button
        onClick={() => handleLaunchNotification("launch-jingle")}
        disabled={loading}
      >
        {loading ? "Lancement en cours..." : "Lancer un jingle"}
      </button>
      <button
        onClick={() => handleLaunchNotification("launch-video")}
        disabled={loading}
      >
        {loading ? "Lancement en cours..." : "Lancer la vidéo"}
      </button>
    </>
  );
}
