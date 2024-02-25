"use client";
import { auth } from "./lib/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setUser(user?.displayName ?? (user as any).reloadUserInfo.screenName);
      if (user) {
        console.log("Welcome");
      } else {
        router.push("/account/register");
      }
    });
  }, []);
  return <div>Hello</div>;
}
