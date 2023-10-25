import { useEffect, useRef } from "react"
export default function VideoPlayer({ track }) {
  const ref = useRef()
  useEffect(() => {
    const el = ref.current
    el.muted = true
    const trakaka = track.values().next().value.track
    trakaka.attach(el)
    console.log("aweiwanao")
    console.log(trakaka)
  }, [track])
  return (
    <>
      <video ref={ref} className="w-full h-full bg-black">

      </video>
    </>
  )
}