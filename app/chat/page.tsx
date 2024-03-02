"use client";
import { useEffect, useState } from "react";
import { firestore, auth } from "../lib/firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Button, Input } from "@chakra-ui/react";
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
    setText("");
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
            className={`${message.id === auth?.currentUser?.uid ? "self-end bg-neutral-700" : " self-start flex-row-reverse bg-neutral-800"} flex mt-3 self-start max-w-11/12 p-1 rounded-md h-max items-center justify-between text-justify`}
          >
            <p className="m-2">{message.text}</p>
            <img
              src={message.profilePic}
              alt=""
              className={`w-8 mx-1 h-8 rounded-md border-2`}
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
          <ChevronRightIcon />
        </Button>
        <Input
          className="!h-full !border-2 !border-violet-400 !focus:border-violet-400"
          focusBorderColor="#a78bfa"
          placeholder="Enter your message..."
          required
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
        />
      </div>
    </form>
  );
}
