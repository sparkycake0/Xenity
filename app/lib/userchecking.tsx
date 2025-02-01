"use client";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "./firebase";
export default function UserCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    if (path !== "/account/register") {
      onAuthStateChanged(auth, async (user) => {
        if (user?.uid) {
          return {};
        } else {
          router.push("/account/register");
        }
      });
    }
  }, [path]);
  return children;
}
