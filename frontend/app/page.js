import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex  flex-col items-center  p-24">
      <div className="">
        <h1 className={`mb-3 text-4xl font-semibold`}>Chats</h1>
      </div>
      <div className="  flex flex-row gap-28 p-12">
        <div className=" p-18 flex items-center text-center lg:text-left">
          <Link
            href="/video"
            className="border-transparent background-group rounded-lg border px-5   py-4 hover:border-accent"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Video Chat{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              1 to 1 call on a room
            </p>
          </Link>
        </div>
        <div className=" p-18 flex items-center text-center lg:text-left">
          <Link
            href="/chat"
            className="border-transparent background-group rounded-lg border px-5 py-4  hover:border-accent"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Text Chat{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Text with your contacts
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
