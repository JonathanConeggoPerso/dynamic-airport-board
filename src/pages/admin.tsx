"use client";

import { useState } from "react";

function ActionButton({
  text,
  eventType,
}: Readonly<{
  text: string;
  eventType: string;
}>) {
  const [loading, setLoading] = useState(false);

  const actionStyle = {
    height: "50px",
    width: "200px",
    backgroundColor: "DodgerBlue",
    color: "white",
    fontSize: "1.2em",
    border: "none",
    borderRadius: "16px",
  };

  const handleLaunchNotification = async (eventType: string) => {
    setLoading(true);
    await fetch("/api/trigger-knock", {
      method: "POST",
      body: JSON.stringify({ eventType: eventType }),
    });
    setLoading(false);
  };

  return (
    <button
      type="button"
      style={actionStyle}
      onClick={() => handleLaunchNotification(eventType)}
      disabled={loading}
    >
      {loading ? "Lancement en cours..." : text}
    </button>
  );
}

export default function Admin() {
  const actionsContainerStyle = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "50px",
  };

  return (
    <>
      <h1>Admin Page</h1>
      <div style={actionsContainerStyle}>
        <ActionButton text="Lancer un jingle" eventType="launch-jingle" />
        <ActionButton
          text="Relancer les panneaux de vol"
          eventType="reset-flights"
        />
        <ActionButton text="Lancer la vidéo" eventType="launch-video" />
      </div>
    </>
  );
}
