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
    <nav className="z-40 w-screen lg:w-max h-max lg:h-screen fixed flex lg:flex-col justify-between p-1 lg:p-2 lg:py-4 items-center bg-neutral-800">
      <div className="flex lg:hidden gap-4 lg:gap-10">
        <Link href={"/"}>
          <Button colorScheme="purple">
            <Image src={homeFilled ? homeimgFilled : home} alt="" />
          </Button>
        </Link>

        <Link href={"/account"}>
          <Button colorScheme="purple">
            <Image src={accountFilled ? userFilled : user} alt="" />
          </Button>
        </Link>
      </div>
      <div className="hidden lg:flex lg:flex-col gap-4 lg:gap-6">
        <Link href={"/"}>
          <Button colorScheme="purple" className="flex w-full justify-between">
            <Image src={homeFilled ? homeimgFilled : home} alt="" />{" "}
            <h1>Home</h1>
          </Button>
        </Link>

        <Link href={"/account"}>
          <Button colorScheme="purple" className="flex w-full justify-between">
            <Image src={accountFilled ? userFilled : user} alt="" />{" "}
            <h1>Account</h1>
          </Button>
        </Link>
      </div>

      <Link href={"/chat"} className="w-full hidden lg:flex">
        <Button
          colorScheme="purple"
          className="flex lg:w-full lg:justify-between"
        >
          <Image src={chatFilled ? messageFilled : message} alt="" />{" "}
          <h1>Chat</h1>
        </Button>
      </Link>
      <Link href={"/chat"} className="lg:hidden">
        <Button
          colorScheme="purple"
          className="flex lg:w-full lg:justify-between"
        >
          <Image src={chatFilled ? messageFilled : message} alt="" />
        </Button>
      </Link>
    </nav>
  );
}
