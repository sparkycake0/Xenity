"use client";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "@firebase/auth";

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
  return <main>Accout</main>;
}
