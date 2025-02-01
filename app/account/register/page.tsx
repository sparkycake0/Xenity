"use client";
import Image from "next/image";
import google from "./assets/google(1).svg";
import github from "./assets/github (1).svg";
import facebook from "./assets/facebook (1).svg";
import { Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { signInWithPopup, onAuthStateChanged } from "@firebase/auth";
import {
  auth,
  googleProvider,
  githubProvider,
  facebookProvider,
} from "../../lib/firebase";
import { useState, useEffect } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user?.uid) {
        router.push("/");
      } else {
        console.log("Welcome");
      }
    });
  }, []);
  const handleRegisterWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err) {
      console.log("Error");
    }
  };
  const handleRegisterWithGithub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      router.push("/");
    } catch (err) {
      console.log("Error");
    }
  };
  const handleRegisterWithFacebook = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      router.push("/");
    } catch (err) {
      console.log("Error");
    }
  };
  return (
    <main className="absolute top-0 w-max self-center h-screen z-50 bg-neutral-900 flex flex-col items-center p-4">
      <h1 className="font-bold text-lg text-violet-400">xenity</h1>
      <div className="m-4 bg-neutral-800 rounded-lg relative flex flex-col items-center justify-between p-4 flex-grow">
        <div className="w-full my-12">
          <h1 className="text-4xl font-extrabold text-center">
            {toggle ? "Sign Up" : "Sign In"}
          </h1>
          <div className="my-8 w-full flex flex-col items-center justify-center">
            <h1 className="font-bold text-lg ">
              or continue using social medias
            </h1>
            <div className="flex gap-4 p-2">
              <button
                className=" flex p-1.5 rounded-md items-center justify-between w-max gap-4 bg-white text-black"
                onClick={handleRegisterWithGoogle}
              >
                <Image src={google} width={24} alt="facebook"></Image>
                Google
              </button>
              <button
                className="p-1.5 w-max gap-4 flex bg-blue-500 text-white font-bold items-center justify-between rounded-md"
                onClick={handleRegisterWithFacebook}
              >
                <Image src={facebook} width={24} alt="facebook"></Image>
                <h1>Facebook</h1>
              </button>
              <button
                className="p-1.5 flex items-center justify-between gap-4 w-max bg-black rounded-md text-white"
                onClick={handleRegisterWithGithub}
              >
                <Image src={github} width={24} alt="facebook"></Image>
                <h1>Github</h1>
              </button>
            </div>
          </div>
        </div>
        <form
          className={`h-full w-full p-4 flex flex-col gap-10 ${toggle ? "hidden" : ""}`}
        >
          <div className="flex flex-col gap-4">
            <input
              className="p-2 bg-neutral-700 border-purple-500 border-2 focus:border-purple-700 transition-all duration-150 outline-none"
              placeholder="Email"
            ></input>
            <input
              className="p-2 bg-neutral-700 border-purple-500 border-2 focus:border-purple-700 transition-all duration-150 outline-none"
              placeholder="Password"
            ></input>
          </div>
          <div className="w-full flex flex-col gap-4 items-center">
            <button
              className="p-2 text-xl font-bold text-black bg-purple-600 rounded-md hover:bg-purple-800 w-4/6 transition-all duration-150"
              type="submit"
            >
              Sign In
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setToggle(!toggle);
              }}
              className="!text-white hover:opacity-75 transition-all duration-150"
            >
              you still dont have account?
            </button>
          </div>
        </form>
        <form
          className={`h-full w-full p-4 flex flex-col gap-10 ${toggle ? "" : "hidden"}`}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2 w-4/5 justify-center">
              <input
                className="p-2 w-full bg-neutral-700 border-purple-500 border-2 focus:border-purple-700 transition-all duration-150 outline-none"
                placeholder="Fullname"
              ></input>
              <input
                className="p-2 w-full bg-neutral-700 border-purple-500 border-2 focus:border-purple-700 transition-all duration-150 outline-none"
                placeholder="Username"
              ></input>
            </div>
            <div className="flex flex-col w-4/5 gap-2">
              <input
                className="p-2 w-full bg-neutral-700 border-purple-500 border-2 focus:border-purple-700 transition-all duration-150 outline-none"
                placeholder="Email"
              ></input>

              <input
                className="p-2 w-full bg-neutral-700 border-purple-500 border-2 focus:border-purple-700 transition-all duration-150 outline-none"
                placeholder="Password"
              ></input>
            </div>
          </div>
          <div className="w-full items-center flex flex-col gap-4">
            <button
              className="p-2 text-xl font-bold text-black bg-purple-600 rounded-md hover:bg-purple-800 w-4/6 transition-all duration-150"
              type="submit"
            >
              Sign Up
            </button>
            <button
              onClick={() => {
                setToggle(!toggle);
              }}
              className="!text-white"
            >
              you already have account?
            </button>
          </div>
        </form>
        <div className="select-none opacity-0">asdasd</div>
        <div className="select-none opacity-0">asdasd</div>
        <div className="select-none opacity-0">asdasd</div>
      </div>
    </main>
  );
}
