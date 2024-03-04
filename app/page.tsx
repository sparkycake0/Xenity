import Link from "next/link";
export default function Home() {
  return (
    <main className="flex text-center flex-grow flex-col items-center p-4">
      <div>Still in development.</div>
      <div>
        On this website you can check{" "}
        <Link href={"/chat"} className="text-violet-400 font-bold">
          Live Chat
        </Link>{" "}
        or check your account informations on{" "}
        <Link href={"/account"} className="text-violet-400 font-bold">
          Account Page.
        </Link>
      </div>
    </main>
  );
}
