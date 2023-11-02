import { useEffect, useRef, useState } from "react"
export default function VideoPlayer({ publications, participant }) {
  const ref = useRef();
  const [publication, setPublication] = useState();
  const [track, setTrack] = useState(publication && publication.track);
  const [tracks, setTracks] = useState([]);

  // useEffect(() => {
  //   const condition = (publication) => publication.kind === 'video';
  //   const auxPublication = publications.find(condition);
  //   setPublication(auxPublication);
  // }, [publications]);

  useEffect(() => {
    // Reset the track when the 'publication' variable changes.
    if (publication) {
      setTrack(publication.track);

      const removeTrack = () => setTrack(null);
      publication.on('subscribed', setTrack);
      publication.on('unsubscribed', removeTrack);

      return () => {
        publication.off('subscribed', setTrack);
        publication.off('unsubscribed', removeTrack);
      };
    }
  }, [publication]);

  useEffect(() => {
    const el = ref.current;
    tracks.forEach((track) => {
      track.attach(el);
      console.log(track)
      return () => {
        track.detach(el);
        el.srcObject = null;
      };
    }); {
    }
  }, [tracks]);
  useEffect(() => {
    const subscribedTracks = Array.from(participant.tracks.values())
      .filter(trackPublication => trackPublication.track !== null)
      .map(trackPublication => trackPublication.track);

    setTracks(subscribedTracks);

    const handleTrackSubscribed = (track) => setTracks(prevTracks => [...prevTracks, track]);
    const handleTrackUnsubscribed = (track) =>
      setTracks(prevTracks => prevTracks.filter(t => t !== track));

    participant.on('trackSubscribed', handleTrackSubscribed);
    participant.on('trackUnsubscribed', handleTrackUnsubscribed);
    return () => {
      participant.off('trackSubscribed', handleTrackSubscribed);
      participant.off('trackUnsubscribed', handleTrackUnsubscribed);
    };
  }, [participant]);


  return (
    <>
      <video ref={ref} className=" h-full flex border">

      </video>
    </>
  )
}