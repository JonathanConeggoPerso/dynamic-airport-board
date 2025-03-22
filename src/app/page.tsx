"use client";

import Board from "@/components/Board";
import { KnockFeedProvider, KnockProvider } from "@knocklabs/react";

export default function Home() {
  return (
    <KnockProvider
      apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY!}
      userId="board"
    >
      <KnockFeedProvider
        feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID!}
      >
        <Board />
      </KnockFeedProvider>
    </KnockProvider>
  );
}
