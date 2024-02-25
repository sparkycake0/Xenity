"use client";
import Image from "next/image";
import google from "./assets/google(1).svg";
import github from "./assets/github (1).svg";
import facebook from "./assets/facebook (1).svg";
import { Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "@firebase/auth";
import {
  auth,
  googleProvider,
  githubProvider,
  facebookProvider,
} from "../../lib/firebase";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);

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
    <main className="absolute top-0 w-screen h-screen z-50 bg-neutral-900 flex flex-col items-center p-4">
      <h1 className="font-bold text-lg">xenity</h1>
      <div className="m-4 bg-neutral-800 rounded-lg relative flex flex-col items-center justify-between p-4 flex-grow">
        <div className="w-full my-12">
          <h1 className="text-4xl font-extrabold text-center">Sign up</h1>
          <div className="my-8 w-full flex flex-col items-center justify-center p-2">
            <h1 className="font-bold text-lg">
              or continue using social medias
            </h1>
            <div className="flex gap-4 p-2">
              <Button
                className="!px-2 gap-4 !bg-white !text-black"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                onClick={handleRegisterWithGoogle}
              >
                <Image src={google} width={24} alt="facebook"></Image>
                <h1>Google</h1>
              </Button>
              <Button
                colorScheme="facebook"
                className="!px-2 gap-4"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                onClick={handleRegisterWithFacebook}
              >
                <Image src={facebook} width={24} alt="facebook"></Image>
                <h1>Facebook</h1>
              </Button>
              <Button
                className="!px-2 gap-4 !bg-black !text-white"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                onClick={handleRegisterWithGithub}
              >
                <Image src={github} width={24} alt="facebook"></Image>
                <h1>Github</h1>
              </Button>
            </div>
          </div>
        </div>
        <form
          className={`h-full w-full p-4 flex flex-col gap-10 ${toggle ? "hidden" : ""}`}
        >
          <div className="flex flex-col gap-4">
            <Input focusBorderColor="#8b5cf6" placeholder="Email"></Input>
            <Input focusBorderColor="#8b5cf6" placeholder="Password"></Input>
          </div>
          <div className="w-full flex flex-col gap-4">
            <Button colorScheme="purple" type="submit">
              Sign In
            </Button>
            <Button
              variant="link"
              onClick={() => {
                setToggle(!toggle);
              }}
              className="!text-white"
            >
              you still dont have account?
            </Button>
          </div>
        </form>
        <form
          className={`h-full w-full p-4 flex flex-col gap-10 ${toggle ? "" : "hidden"}`}
        >
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Input focusBorderColor="#8b5cf6" placeholder="Fullname"></Input>
              <Input focusBorderColor="#8b5cf6" placeholder="Username"></Input>
            </div>
            <Input focusBorderColor="#8b5cf6" placeholder="Email"></Input>
            <div>
              <Input focusBorderColor="#8b5cf6" placeholder="Password"></Input>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <Button colorScheme="purple" type="submit">
              Sign Up
            </Button>
            <Button
              variant="link"
              onClick={() => {
                setToggle(!toggle);
              }}
              className="!text-white"
            >
              you already have account?
            </Button>
          </div>
        </form>
        <div className="select-none opacity-0">asdasd</div>
        <div className="select-none opacity-0">asdasd</div>
        <div className="select-none opacity-0">asdasd</div>
      </div>
    </main>
  );
}
