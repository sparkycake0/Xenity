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
        await setAccountData({
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
    <nav className="p-12 flex-grow flex justify-between items-center flex-col">
      <div className="rounded-md bg-violet-500 p-4 text-violet-900 text-center font-extrabold text-4xl">
        <h1>Welcome {accountData.displayName}</h1>
      </div>
      <div className="items-center w-full h-full p-12 flex flex-col">
        <div className="bg-violet-900 p-1 rounded-3xl">
          <img
            src={accountData.profilePicture}
            alt=""
            className="w-48 h-48 rounded-3xl p-1"
          />
        </div>
        <div className=" flex flex-grow flex-col justify-between items-center text-center p-2">
          <h1 className="text-4xl mb-6 font-bold text-violet-700 ">
            {accountData.displayName}
          </h1>
          <div className="flex flex-col bg-violet-500 p-4 rounded-lg hover:scale-105 ">
            <h1 className="text-2xl font-semibold border-accent bg-accent text-violet-900 rounded-md transition-transform duration-100">
              {accountData.email}
            </h1>
          </div>
          <div className="lg:hidden"></div>
        </div>
      </div>
      <div>
        <button
          className="bg-violet-900 p-4 font-bold text-violet-500 text-2xl rounded-lg hover:scale-105"
          onClick={handleSignOut}
        >
          Log Out
        </button>
      </div>
    </nav>
  );
}
