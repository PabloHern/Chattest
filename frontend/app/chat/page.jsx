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
        participants.map((participant) => {
          return (
            <>
              <div key={participant.identity}>
                {participant.videoTracks ?
                  <VideoPlayer track={participant.videoTracks}></VideoPlayer>
                  : ""}
              </div>
            </>
          )
        }) : ""}
    </>
  )
}