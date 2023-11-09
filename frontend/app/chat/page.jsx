import dynamic from "next/dynamic";

const Chat = dynamic(() => import("../../components/Chatwrapper"), {
  ssr: false,
});
export default function Page() {
  return (
    <>
      <div className="flex w-full justify-center">
        <div className=" w-full max-w-7xl">
          <Chat></Chat>
        </div>
      </div>
    </>
  );
}
