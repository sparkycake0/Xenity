"use client";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "@firebase/auth";
import defaultUser from "./assets/account_circle_FILL0_wght400_GRAD0_opsz24.svg";
import { Image, Button } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";

export default function Home() {
  const router = useRouter();
  const [accountData, setAccountData] = useState({
    displayName: "",
    profilePicture: "",
    email: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const displayName =
          user?.displayName ?? (user as any).reloadUserInfo?.screenName;
        setAccountData({
          displayName: displayName,
          profilePicture: user?.photoURL ?? "",
          email: user?.email ?? "",
        });
      } else {
        router.push("/account/register");
      }
    });
    return unsubscribe;
  }, []);

  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <main className="flex flex-col justify-between pb-12 items-center flex-grow">
      <div className="p-4 h-max w-full flex gap-6 flex-col items-center bg-neutral-800">
        <Image
          src={accountData.profilePicture ?? defaultUser}
          alt=""
          width={300}
          height={300}
          className="rounded-3xl"
        />
        <h1 className="text-5xl font-bold p-2">
          {accountData.displayName ?? "Name not loaded"}
        </h1>
        <div className="flex items-center gap-4 p-2">
          <EmailIcon className="scale-150" />
          <h1 className="font-bold text-xl">{accountData.email}</h1>
        </div>
      </div>
      <Button colorScheme="red" className="!scale-150" onClick={handleSignOut}>
        Sign Out
      </Button>
    </main>
  );
}
