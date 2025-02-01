"use client";
import { Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import home from "./assets/home_FILL0_wght400_GRAD0_opsz24.svg";
import homeimgFilled from "./assets/home_FILL1_wght400_GRAD0_opsz24.svg";
import user from "./assets/person_FILL0_wght400_GRAD0_opsz24.svg";
import userFilled from "./assets/person_FILL1_wght400_GRAD0_opsz24.svg";
import message from "./assets/chat_FILL0_wght400_GRAD0_opsz24.svg";
import messageFilled from "./assets/chat_FILL1_wght400_GRAD0_opsz24.svg";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [homeFilled, setHomeFilled] = useState(false);
  const [accountFilled, setAccountFilled] = useState(false);
  const [chatFilled, setChatFilled] = useState(false);

  const pathname = usePathname();
  useEffect(() => {
    pathname === "/account" ? setAccountFilled(true) : setAccountFilled(false);
    pathname === "/" ? setHomeFilled(true) : setHomeFilled(false);
    pathname === "/chat" ? setChatFilled(true) : setChatFilled(false);
  }, [pathname]);
  return (
    <nav className="z-40 w-screen lg:w-max h-max lg:h-screen fixed flex lg:flex-col justify-between p-1 lg:p-4 lg:py-4 items-center bg-neutral-800">
      <div className="flex lg:hidden gap-4 lg:gap-10">
        <Link href={"/"}>
          <button className="flex bg-purple-500 hover:bg-purple-700 p-2 rounded-md transition-all duration-150">
            <Image src={homeFilled ? homeimgFilled : home} alt="" />
          </button>
        </Link>

        <Link href={"/account"}>
          <button className="flex bg-purple-500 hover:bg-purple-700 p-2 rounded-md transition-all duration-150">
            <Image src={accountFilled ? userFilled : user} alt="" />
          </button>
        </Link>
      </div>
      <div className="hidden lg:flex lg:flex-col gap-4 lg:gap-6">
        <Link href={"/"}>
          <button className="flex w-full gap-2 items-center justify-between bg-purple-500 hover:bg-purple-700 p-2 transition-all duration-150 rounded-md">
            <Image src={homeFilled ? homeimgFilled : home} alt="" />{" "}
            <h1>Home</h1>
          </button>
        </Link>

        <Link href={"/account"}>
          <button className="flex w-full gap-2 items-center justify-between bg-purple-500 hover:bg-purple-700  transition-all duration-150 p-2 rounded-md">
            <Image src={accountFilled ? userFilled : user} alt="" />{" "}
            <h1>Account</h1>
          </button>
        </Link>
      </div>

      <Link href={"/chat"} className="w-full hidden lg:flex">
        <button className="flex lg:w-full lg:justify-between bg-purple-500 hover:bg-purple-700 transition-all duration-150 gap-2 p-2 rounded-md">
          <Image src={chatFilled ? messageFilled : message} alt="" />{" "}
          <h1>Chat</h1>
        </button>
      </Link>
      <Link href={"/chat"} className="lg:hidden">
        <button className="flex bg-purple-500 hover:bg-purple-700 p-2 rounded-md transition-all duration-150">
          <Image src={chatFilled ? messageFilled : message} alt="" />
        </button>
      </Link>
    </nav>
  );
}
