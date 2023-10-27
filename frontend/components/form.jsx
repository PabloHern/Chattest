"use client"
import { useForm } from "react-hook-form";
import useConnect from "@/hooks/useConnect";
export default function Form({ participants, setParticipants, partDiv }) {
  const { megaConnect } = useConnect()
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const joinVideoRoom = async (roomName, token) => {
    // join the video room with the Access Token and the given room name

  };

  const handleConnectedParticipant = (participant) => {
    setParticipants((prev) => [...prev, participant])
  };
  const handleDisconnectedParticipant = (participant) => {
    // stop listening for this participant
    participant.removeAllListeners();

  };
  const onSubmit = async (data) => {
    // prevent a page reload when a user submits the form
    event.preventDefault();
    // hide the join form
    // retrieve the room name
    const roomName = data.example;

    // fetch an Access Token from the join-room route
    const response = await fetch("http://localhost:5000/join-room", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomName }),
    });
    const { token } = await response.json();
    console.log(token);
    const room = await megaConnect(roomName, token);
    console.log(room.participants);
    handleConnectedParticipant(room.localParticipant);
    room.participants.forEach(handleConnectedParticipant);
    room.on("participantConnected", handleConnectedParticipant);
    // handle cleanup when a participant disconnects
    room.on("participantDisconnected", handleDisconnectedParticipant);
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className="p-24 flex gap-8  items-center text-center" onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <label>Room </label>
      <input defaultValue="test" {...register("example")} />

      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <button type="submit" className="bg-secondary hover:bg-primary  
           font-medium rounded-lg  px-5 py-1.5 mr-2 mb-2">
        Send
      </button>
      {/* <button onClick={()=>handleDisconnectedParticipant()} className="bg-secondary hover:bg-primary  
           font-medium rounded-lg  px-5 py-1.5 mr-2 mb-2">
            Send
      </button> */}
    </form>
  );
}