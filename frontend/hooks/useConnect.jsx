import Video from "twilio-video"
export default function useConnect() {
  const megaConnect = async (roomName, token) => {
    const room = await Video.connect(token, {
      room: roomName,
    });
    return room;
  }
  return { megaConnect }
}