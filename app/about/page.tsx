"use client";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import instagram from "./assets/instagram.svg";
import github from "./assets/github.svg";
import telegram from "./assets/telegram.svg";

export default function AboutPage() {
  const [name, setName] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setName(
        user?.displayName ??
        (user as any).reloadUserInfo?.screenName ??
        "(Name not loaded)",
      );
    });
  }, []);
  return <main>About</main>;
}
