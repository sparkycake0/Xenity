"use client";
import Image from "next/image";
import menu from "./assets/menu_FILL0_wght400_GRAD0_opsz24.svg";
import home from "./assets/home_FILL0_wght400_GRAD0_opsz24.svg";
import user from "./assets/person_FILL0_wght400_GRAD0_opsz24.svg";
import message from "./assets/chat_FILL0_wght400_GRAD0_opsz24.svg";
import close from "./assets/close_FILL0_wght400_GRAD0_opsz24.svg";
import info from "./assets/info_FILL0_wght400_GRAD0_opsz24.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(true);
  };

  return (
    <nav className="w-screen z-50  h-max bg-neutral-800 p-2">
      <div className="flex justify-between items-center mx-4">
        <button className="flex gap-2 items-center" onClick={handleClick}>
          <Image
            alt=""
            src={menu}
            width={30}
            className="hover:scale-110 transition-transform duration-100 lg:hidden"
          />
        </button>
        <div className="hidden lg:flex w-full justify-evenly">
          <div
            className="flex font-bold gap-2 justify-center hover:bg-violet-700 transition-colors duration-200 rounded-lg p-2 items-center cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          >
            <Image src={home} alt="" />
            <h1>Home</h1>
          </div>
          <div
            className="flex font-bold gap-2 justify-center hover:bg-violet-700 transition-colors duration-200 rounded-lg p-2 items-center cursor-pointer"
            onClick={() => {
              router.push("/account");
            }}
          >
            <Image src={user} alt="" width={30} />
            <h1>Account</h1>
          </div>
          <div
            className="flex font-bold gap-2 justify-center hover:bg-violet-700 transition-colors duration-200 rounded-lg p-2 items-center cursor-pointer"
            onClick={() => {
              router.push("/about");
            }}
          >
            <Image src={info} alt="" width={30} />
            <h1>About</h1>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              router.push("/chat");
            }}
            className="flex items-center justify-center"
          >
            <Image
              src={message}
              alt="photo"
              width={30}
              className="hover:scale-110 transition-transform duration-100"
            />
          </button>
        </div>
      </div>
      <div
        className={`absolute top-0 left-0 lg:-translate-x-full transition-transform duration-500 p-4 h-screen w-max flex flex-col justify-between opacity-100 backdrop-blur-lg backdrop-brightness-75 -translate-x-full ${click ? "translate-x-0 " : ""}`}
      >
        <div className="select-none text-transparent">ASDASD</div>
        <div className="w-full flex flex-col items-start justify-center gap-10">
          <div
            className="absolute top-0 left-0 flex items-center justify-center w-full mt-3 cursor-pointer"
            onClick={() => {
              setClick(false);
            }}
          >
            <Image
              src={close}
              className="rotate-90"
              alt=""
              width={30}
              height={30}
            />
          </div>
          <div
            className="flex w-full hover:bg-violet-700 transition-colors duration-200 rounded-lg p-2 font-bold gap-2 justify-start items-center cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          >
            <Image src={home} alt="" width={30} />
            <h1>Home</h1>
          </div>
          <div
            className="flex hover:bg-violet-700 transition-colors duration-200 rounded-lg p-2 font-bold gap-2 justify-start items-center cursor-pointer"
            onClick={() => {
              router.push("/account");
            }}
          >
            <Image src={user} alt="" width={30} />
            <h1>Account</h1>
          </div>
          <div
            className="flex hover:bg-violet-700 transition-colors duration-200 rounded-lg bottom-0 w-full left-0 p-2 font-bold gap-2 justify-start items-center cursor-pointer"
            onClick={() => {
              router.push("/about");
            }}
          >
            <Image src={info} alt="" width={30} />
            <h1>About</h1>
          </div>
        </div>
        <div className="select-none text-transparent">ASDASD</div>
      </div>
    </nav>
  );
}
