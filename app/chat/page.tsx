"use client";
import { useEffect, useState, useRef } from "react";
import { firestore, auth } from "../lib/firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import send from "./send_FILL0_wght400_GRAD0_opsz24.svg";

export default function ChatPage() {
  interface Message {
    text: string;
    profilePic: string;
    id: string;
    timestamp: number;
  }
  const [text, setText] = useState("");
  const [mssgs, setMssgs] = useState<Message[]>([]);
  const [pfp, setPfp] = useState("");
  const [userId, setUserId] = useState("");
  const [domLoad, setDomLoad] = useState(false);
  const mssgRef = collection(firestore, "messages");
  const messagesRef = useRef(null);
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    setDomLoad(true);
    onAuthStateChanged(auth, (user) => {
      setPfp(user?.photoURL ?? "");
      setUserId(user?.uid ?? "");
    });

    const unsubscribe = onSnapshot(mssgRef, async (snapshot) => {
      const messages = await snapshot.docs.map((doc) => ({
        id: doc.data().id,
        text: doc.data().text,
        profilePic: doc.data().profilePic,
        timestamp: doc.data().timestamp.seconds,
      }));
      await messages.sort((a, b) => b.timestamp - a.timestamp);
      await setMssgs(messages);
    });
    scrollToBottom();
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [mssgs]);
  const addMessage = async () => {
    const timestamp = Date.now();
    await addDoc(mssgRef, {
      text: text,
      profilePic: pfp,
      id: userId,
      timestamp,
    });
    scrollToBottom();
  };
  return (
    <main className="flex justify-between flex-col mt-6 pb-4 pl-4 pr-4 items-center flex-grow">
      <div className="font-bold text-2xl bg-neutral-800 w-full h-max text-center">
        <h1 className="p-4 text-violet-400">Live Chat</h1>
      </div>
      <div
        className={`w-screen overflow-y-auto break-all h-full text-right transition-all duration-1000 delay-500 ${domLoad ? "opacity-100" : "opacity-0"} p-2 mb-4 flex flex-col-reverse`}
        ref={messagesRef}
      >
        {mssgs.map((message, index) => (
          <div
            key={`${message.id}-${index}`}
            className={`${message.id === auth?.currentUser?.uid ? "self-end bg-neutral-700" : " self-start flex-row-reverse bg-neutral-800"} flex mt-3 self-start max-w-80 lg:max-w-screen-lg lg:w-max p-1 break-all rounded-md h-max items-center justify-center text-justify`}
          >
            <p className="m-2 break-all w-max text-wrap break-words">
              {message.text}
            </p>
            <img
              src={message.profilePic}
              alt=""
              className="w-8 mx-1 h-8 rounded-md border-2"
            />
          </div>
        ))}
      </div>
      <form className="w-screen flex justify-center items-center">
        <input
          type="text"
          value={text}
          className="w-full bg-neutral-800 p-3 font-semibold text-xl transition-colors duration-200 rounded-r-lg focus:bg-neutral-700 focus:outline-none"
          placeholder="Enter your message"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            addMessage();
            setText("");
          }}
          className="p-2 text-xl ml-2 bg-neutral-800 rounded-l-lg h-full hover:bg-neutral-700 transition-all duration-100 active:scale-105"
        >
          <Image src={send} alt="" width={36} />
        </button>
      </form>
    </main>
  );
}
