"use client"
import Form from "@/components/form"
import { useState, useRef } from "react"
export default function Page() {
  const [participants, setParticipants] = useState()
  const partDiv = useRef()
  return (
    <>
      <Form participants={participants} setParticipants={setParticipants} partDiv={partDiv}></Form>
      {participants ?
        participants.map((participant) => {
          return (
            <>
              <div ref={partDiv} key={participant.identity}></div>
            </>
          )
        }) : ""}
    </>
  )
}