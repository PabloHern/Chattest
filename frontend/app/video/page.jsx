"use client";
import Form from "@/components/Form";
import VideoPlayer from "@/components/VideoPlayer";
import { useState, useRef, useEffect } from "react";
export default function Page() {
  const [participants, setParticipants] = useState([]);
  const partDiv = useRef();
  return (
    <>
      <Form
        participants={participants}
        setParticipants={setParticipants}
        partDiv={partDiv}
      ></Form>
      {participants ? (
        <div className="flex flex-col  justify-center p-4 pt-0 md:flex-row ">
          {participants.map((participant) => {
            return (
              <div key={participant.identity} className="flex p-2 ">
                {participant.tracks ? (
                  <VideoPlayer
                    participant={participant}
                    publications={Array.from(participant.tracks.values())}
                  ></VideoPlayer>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
