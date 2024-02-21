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
      await setUser(
        user?.displayName ?? (user as any).reloadUserInfo.screenName,
      );
      if (user) {
        console.log("Welcome");
      } else {
        router.push("/account/register");
      }
    });
  }, []);
  return (
    <nav className="p-12 flex-grow flex items-center flex-col">
      <h1>Hello {user}</h1>
      <h1>Welcome to our website</h1>
    </nav>
  );
}
