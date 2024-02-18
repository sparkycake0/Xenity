"use client";
import Image from "next/image";
import google from "./assets/google(1).svg";
import github from "./assets/github (1).svg";
import facebook from "./assets/facebook (1).svg";

import { useRouter } from "next/navigation";
import { signInWithPopup } from "@firebase/auth";
import {
  auth,
  googleProvider,
  githubProvider,
  facebookProvider,
} from "../../lib/firebase";

export default function RegisterPage() {
  const router = useRouter();

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
    <div className="font-bold absolute w-screen p-6 h-screen bg-neutral-900 top-0 left-0 right-0 bottom-0 text-center">
      <div className="rounded-lg gap-8 p-6 w-full h-full bg-neutral-800 text-violet-500 flex justify-around items-center flex-col">
        <div className="text-3xl lg:text-5xl">
          <h1>Start your chatting journey here!</h1> <br />
          <p className="text-xl lg:text-3xl text-violet-500">
            Create your key to socializing!
          </p>
        </div>
        <div className="flex flex-col p-3 gap-5 lg:gap-12">
          <button
            onClick={handleRegisterWithGoogle}
            className=" hover:scale-105 lg:hover:scale-150 lg:scale-125 active:scale-110 flex transition-transform duration-100 bg-white p-3 text-black rounded-md"
          >
            <Image
              src={google}
              priority
              width={24}
              className="mr-5"
              alt="Google"
            />
            Continue with Google
          </button>
          <button
            onClick={handleRegisterWithGithub}
            className=" hover:scale-105 lg:scale-125 lg:hover:scale-150 active:scale-110 flex transition-transform duration-100 bg-black p-3 text-white rounded-md"
          >
            <Image
              src={github}
              priority
              width={24}
              className="mr-5"
              alt="GitHub"
            />
            Continue with GitHub
          </button>
          <button
            onClick={handleRegisterWithFacebook}
            className=" hover:scale-105 lg:scale-125 lg:hover:scale-150 active:scale-110 flex transition-transform duration-100 bg-blue-600 p-3 text-white rounded-md"
          >
            <Image
              src={facebook}
              priority
              width={24}
              className="mr-5"
              alt="GitHub"
            />
            Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
