import { Knock } from "@knocklabs/node";
import { NextApiRequest, NextApiResponse } from "next";

const knock = new Knock(process.env.KNOCK_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await knock.workflows.trigger("weddingwaiting", {
        data: { event_type: "launch-jingle" },
        recipients: [
          {
            id: "board",
            name: "Board",
          },
        ],
      });
      res.status(200).json({ message: "Knock triggered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to trigger Knock" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
