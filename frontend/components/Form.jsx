"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useConnect from "@/hooks/useConnect";
export default function Form({ participants, setParticipants, partDiv }) {
  const { megaConnect } = useConnect();
  const [roomLabel, setRoomLabel] = useState();
  const [localPart, setLocalPart] = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const joinVideoRoom = async (roomName, token) => {
    // join the video room with the Access Token and the given room name
  };

  const handleConnectedParticipant = (participant) => {
    setParticipants((prev) => [...prev, participant]);
  };
  const handleDisconnectedParticipant = () => {
    setParticipants([]);
    setRoomLabel(undefined);
  };
  const onSubmit = async (data) => {
    // prevent a page reload when a user submits the form
    event.preventDefault();
    // hide the join form
    // retrieve the room name
    const roomName = data.example;

    // fetch an Access Token from the join-room route
    const response = await fetch("https://chattest-back.vercel.app/join-room", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomName }),
    });
    const { token } = await response.json();
    const room = await megaConnect(roomName, token);
    handleConnectedParticipant(room.localParticipant);
    setLocalPart(room.localParticipant);
    room.participants.forEach(handleConnectedParticipant);
    setRoomLabel(roomName);
    room.on("participantConnected", handleConnectedParticipant);
    // handle cleanup when a participant disconnects
    room.on("participantDisconnected", handleDisconnectedParticipant);
    if (typeof window !== "undefined") {
      window.addEventListener("pagehide", () => room.disconnect());
      window.addEventListener("beforeunload", () => room.disconnect());
    }
  };

  return (
    <>
      {!roomLabel ? (
        <form
          className="text-align-center flex items-center justify-center gap-8 p-16 pt-20"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* register your input into the hook by invoking the "register" function */}
          <label>Room </label>
          <input
            className=" rounded border border-secondary"
            placeholder="Enter your room name"
            {...register("example")}
          />

          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}

          <button
            type="submit"
            className="
           rounded-lg bg-secondary  px-5 py-1.5 font-medium hover:bg-accent"
          >
            Send
          </button>
        </form>
      ) : (
        <div className="text-align-center flex items-center justify-center gap-8 p-16 pt-20">
          <h1>Room name: {roomLabel}</h1>
          <button
            onClick={() => handleDisconnectedParticipant()}
            className="rounded-lg bg-secondary  px-5 py-1.5 font-medium hover:bg-accent"
          >
            Quit
          </button>
        </div>
      )}
    </>
  );
}
