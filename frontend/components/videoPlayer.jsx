import { useEffect, useRef, useState } from "react"
export default function VideoPlayer({ publications, participant }) {
  const ref = useRef()
  const [publication, setPublication] = useState()
  const [track, setTrack] = useState(publication && publication.track);
  const [tracks, setTracks] = useState([]);

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
  useEffect(() => {
    // Reset the track when the 'publication' variable changes.
    setTrack(publication && publication.track);

    if (publication) {
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
    el.muted = true;
    track.attach(el);
    return () => {
      track.detach(el);

      // This addresses a Chrome issue where the number of WebMediaPlayers is limited.
      // See: https://github.com/twilio/twilio-video.js/issues/1528
      el.srcObject = null;

    };
  }, [track]);
  useEffect(() => {
    const condition = (publication) => publication.kind === 'video';
    const auxpublication = publications.find(condition)
    setPublication(auxpublication)
  }, [])

  return (
    <>
      <video ref={ref} className="w-full h-full bg-black">

      </video>
    </>
  )
}