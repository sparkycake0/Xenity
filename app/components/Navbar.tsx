import { Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import home from "./assets/home_FILL0_wght400_GRAD0_opsz24.svg";
import user from "./assets/person_FILL0_wght400_GRAD0_opsz24.svg";
import message from "./assets/chat_FILL0_wght400_GRAD0_opsz24.svg";
import info from "./assets/info_FILL0_wght400_GRAD0_opsz24.svg";

export default function Navbar() {
  return (
    <nav className="z-40 w-screen lg:w-max h-max lg:h-screen relative flex lg:flex-col justify-between p-1 lg:p-2 lg:py-4 lg:mr-6 items-center bg-neutral-800">
      <div className="flex lg:hidden gap-4 lg:gap-10">
        <Link href={"/"}>
          <Button colorScheme="purple">
            <Image src={home} alt="" />
          </Button>
        </Link>

        <Link href={"/account"}>
          <Button colorScheme="purple">
            <Image src={user} alt="" />
          </Button>
        </Link>

        <Link href={"/about"}>
          <Button colorScheme="purple">
            <Image src={info} alt="" />
          </Button>
        </Link>
      </div>
      <div className="hidden lg:flex lg:flex-col gap-4 lg:gap-10">
        <Link href={"/"}>
          <Button colorScheme="purple" className="flex w-full justify-between">
            <Image src={home} alt="" /> <h1>Home</h1>
          </Button>
        </Link>

        <Link href={"/account"}>
          <Button colorScheme="purple" className="flex w-full justify-between">
            <Image src={user} alt="" /> <h1>Account</h1>
          </Button>
        </Link>

        <Link href={"/about"}>
          <Button colorScheme="purple" className="flex w-full justify-between">
            <Image src={info} alt="" /> <h1>About</h1>
          </Button>
        </Link>
      </div>

      <Link href={"/chat"} className="w-full hidden lg:flex">
        <Button
          colorScheme="purple"
          className="flex lg:w-full lg:justify-between"
        >
          <Image src={message} alt="" /> <h1>Chat</h1>
        </Button>
      </Link>
      <Link href={"/chat"} className="lg:hidden">
        <Button
          colorScheme="purple"
          className="flex lg:w-full lg:justify-between"
        >
          <Image src={message} alt="" />
        </Button>
      </Link>
    </nav>
  );
}
