"use client";

import { useState } from "react";

export default function Admin() {
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    setLoading(true);
    await fetch("/api/trigger-knock", { method: "POST" });
    setLoading(false);
  };

  return (
    <>
      <h1>Admin Page</h1>
      <button onClick={handleButtonClick} disabled={loading}>
        {loading ? "Lancement en cours..." : "Lancer un jingle"}
      </button>
    </>
  );
}
