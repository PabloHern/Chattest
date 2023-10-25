"use client"
import { useForm } from "react-hook-form";
import useConnect from "@/hooks/useConnect";
export default function Form(participants, setParticipants, partDiv) {
  const { megaConnect } = useConnect()
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const joinVideoRoom = async (roomName, token) => {
    // join the video room with the Access Token and the given room name

  };
  const handleTrackPublication = (trackPublication, participant) => {
    function displayTrack(track) {
      // append this track to the participant's div and render it on the page
      // track.attach creates an HTMLVideoElement or HTMLAudioElement
      // (depending on the type of track) and adds the video or audio stream
      partDiv.current.append(track.attach());
    }

    // check if the trackPublication contains a `track` attribute. If it does,
    // we are subscribed to this track. If not, we are not subscribed.
    if (trackPublication.track) {
      displayTrack(trackPublication.track);
    }

    // listen for any new subscriptions to this track publication
    trackPublication.on("subscribed", displayTrack);
  };
  const handleConnectedParticipant = (participant) => {
    setParticipants((prev) => [...prev, participant])
    participant.tracks.forEach((trackPublication) => {
      console.log("trackPublication: ", trackPublication);
      handleTrackPublication(trackPublication, participant);
    });

    // listen for any new track publications
    participant.on("trackPublished", handleTrackPublication);
  };
  const handleDisconnectedParticipant = (participant) => {
    // stop listening for this participant
    participant.removeAllListeners();
    // remove this participant's div from the page
    const participantDiv = document.getElementById(participant.identity);
    participantDiv.remove();
  };
  const onSubmit = async (data) => {
    // prevent a page reload when a user submits the form
    event.preventDefault();
    // hide the join form
    // retrieve the room name
    const roomName = data;

    // fetch an Access Token from the join-room route
    const response = await fetch("http://localhost:5000/join-room", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomName: roomName }),
    });
    const { token } = await response.json();
    console.log(token);
    const room = await megaConnect(roomName, token);
    console.log(room);
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
           font-medium rounded-lg  px-5 py-1.5 mr-2 mb-2">Send</button>
    </form>
  );
}