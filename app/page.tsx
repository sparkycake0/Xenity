"use client";
import { auth } from "./lib/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user?.displayName ?? (user as any).reloadUserInfo.screenName);
    });
    if (auth?.currentUser) {
    } else {
      router.push("/account/register");
    }
  }, []);
  return (
    <nav className="p-12 flex-grow flex items-center flex-col">
      <div>
        <h1>Hello {user}</h1>
        <h1>Welcome to Socialize!</h1>
      </div>
      <div>
        <h1>
          You can go to chat icon in top right corner or use navigaton menu to
          navigate around.
        </h1>
      </div>
    </nav>
  );
}
