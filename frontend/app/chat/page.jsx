"use client"
import Form from "@/components/form"
import VideoPlayer from "@/components/videoPlayer"
import { useState, useRef, useEffect } from "react"
export default function Page() {
  const [participants, setParticipants] = useState([])
  const partDiv = useRef()
  useEffect(() => {
  }, [participants])
  return (
    <>
      <Form participants={participants} setParticipants={setParticipants} partDiv={partDiv}></Form>
      {participants ?
        <div className="p-4 pt-0  justify-center flex flex-col md:flex-row ">
          {participants.map((participant, index) => {
            return (
              <>
                <div key={index} className="p-2 flex " >
                  {participant.tracks ?
                    <VideoPlayer participant={participant} publications={Array.from(participant.tracks.values())}></VideoPlayer>
                    : ""}
                </div>
              </>
            )
          })}
        </div> : ""}
    </>
  )
}