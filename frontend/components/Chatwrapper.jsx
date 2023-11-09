"use client";

import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import Chatbox from "./Chatbox";
export default function Chatwrapper() {
  const client = Ably.Realtime.Promise({ authUrl: "/api" });

  return (
    <AblyProvider client={client}>
      <div className="h-screen pl-2 pr-2">
        <div className="bg-white flex items-center justify-between border-b-2 px-5 py-5">
          <div className="text-2xl font-semibold">Chat</div>
        </div>
        <Chatbox></Chatbox>
      </div>
    </AblyProvider>
  );
}
