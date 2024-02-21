"use client";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import instagram from "./assets/instagram.svg";
import github from "./assets/github.svg";
import telegram from "./assets/telegram.svg";

export default function AboutPage() {
  const [name, setName] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setName(
        user?.displayName ??
        (user as any).reloadUserInfo?.screenName ??
        "(Name not loaded)",
      );
    });
  }, []);
  return (
    <main className="flex w-screen  lg:items-center flex-grow justify-evenly flex-col p-4">
      <div className="w-full flex flex-col justify-center items-center h-max">
        <h1 className="text-4xl lg:text-9xl text-violet-900 font-bold">
          WeCanHackNasa
        </h1>
        <p className="text-sm lg:text-xl opacity-30 font-light">
          actually we cant but name is just very interesting :)
        </p>
      </div>
      <div className="lg:flex lg:flex-grow lg:items-center lg:gap-16 lg:p-16">
        {" "}
        <div className="flex flex-col gap-4 text-violet-300 lg:w-1/2 lg:flex-grow text-justify rounded-md my-6 lg:my-0  w-full h-max lg:h-full justify-evenly bg-violet-900 p-4">
          <h1 className="text-center font-bold text-2xl lg:text-4xl">
            Hello dear {name}
          </h1>
          <p className="lg:text-2xl">
            We are duo web developers and this is one of our biggest projects,
            social media called <span className="font-bold">Xenity</span>. We
            hope this will help a lot of peoples with their social anxiety and
            help them socialize among other peoples and get some friends from
            another part of planet. Using our web development skills we are able
            to create place where frendships are made and many of peoples will
            meet each others.
          </p>
          <h2 className="text-xl">
            If you are interested in checking out more about us and our work you
            can check out our{" "}
            <Link
              href={"https://wecanhacknasa.vercel.app"}
              className="font-bold"
            >
              Portfolio Website
            </Link>
          </h2>
        </div>
        <div className="flex gap-6 flex-col text-center">
          <h1 className="text-3xl font-bold">
            Check out more about us on our social medias
          </h1>
          <div className="flex gap-4 lg:gap-16 justify-center">
            <Link
              href={"/"}
              className="p-1 lg:scale-150 hover:-translate-y-3 transition-transform duration-200 text-center rounded-md w-max"
            >
              <Image src={instagram} alt="" width={40} />
            </Link>
            <Link
              href={"/"}
              className="p-1 lg:scale-150 text-center hover:-translate-y-3 transition-transform duration-200 rounded-md w-max"
            >
              <Image src={telegram} alt="" width={40} />
            </Link>
            <Link
              href={"/"}
              className="p-1 lg:scale-150 text-center hover:-translate-y-3 transition-transform duration-200 rounded-md w-max"
            >
              <Image src={github} alt="" width={40} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
