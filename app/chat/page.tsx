"use client";
import { useEffect, useState } from "react";
import { firestore, auth } from "../lib/firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

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
  const mssgRef = collection(firestore, "messages");
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setPfp(user?.photoURL ?? "");
      setUserId(user?.uid ?? "");
    });

    const unsubscribe = onSnapshot(mssgRef, async (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.data().id,
        text: doc.data().text,
        profilePic: doc.data().profilePic,
        timestamp: doc.data().timestamp.seconds,
      }));
      messages.sort((a, b) => b.timestamp - a.timestamp);
      setMssgs(messages);
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addMessage();
        setText("");
      }}
      className="flex flex-col p-4 justify-between flex-grow"
    >
      <div className={`flex flex-col`}>
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
      <div className="relative w-full flex h-12 items-center">
        <Button
          className="!absolute !flex right-1 top-1 z-10 select-none rounded py-2 px-4 text-center align-middle !text-xl"
          type="submit"
          colorScheme="purple"
        >
          <h1>Send</h1>
          <ChevronRightIcon />
        </Button>
        <input
          onChange={(e) => {
            setText(e.target.value);
            setText("");
          }}
          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-violet-400 focus:border-2 focus:border-violet-400 transition-all duration-200 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-violet-50"
          placeholder=" "
          required
        />
        <label className="before:content[' '] transition-all duration-200 after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight !text-violet-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t-2 before:border-l-2 before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t-2 after:border-r-2 after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-violet-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-violet-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-violet-400">
          Enter your message{" "}
        </label>
      </div>
    </form>
  );
}
