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
    sequenceNumber: any;
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
  const getMessages = async () => {
    onAuthStateChanged(auth, (user) => {
      setPfp(user?.photoURL ?? "");
      setUserId(user?.uid ?? "");
    });
    const unsubscribe = onSnapshot(mssgRef, async (snapshot) => {
      const messages = snapshot.docs.map((doc) => {
        try {
          return {
            id: doc.data().id,
            text: doc.data().text,
            profilePic: doc.data().profilePic,
            sequenceNumber: doc.data().sequenceNumber,
          };
        } catch (error) {
          return {};
        }
      }) as Message[];

      messages.sort((a, b) => a.sequenceNumber - b.sequenceNumber);
      setMssgs(messages);

      scrollToBottom();
    });

    return unsubscribe;
  };
  useEffect(() => {
    getMessages();
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
      sequenceNumber: timestamp,
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
            className={`${message.id === auth?.currentUser?.uid ? "self-end bg-neutral-700" : " self-start flex-row-reverse bg-neutral-800"} flex mt-3 self-start max-w-10/12 p-1 rounded-md h-max items-center justify-between text-justify`}
          >
            <p className="my-4 mx-2 max-w-sm text-wrap word-wrap break-all">
              {message.text}
            </p>
            <img
              src={message.profilePic}
              alt=""
              className={`w-8 mx-1 h-8 rounded-md border-2`}
            />
          </div>
        ))}
      </div>
      <div className="relative mt-10 w-full flex flex-row-reverse !items-center mb-8">
        <button
          className="absolute -translate-y-1/2 h-max flex right-2 top-1/2 z-10 select-none rounded p-2 text-center align-middle bg-purple-700 text-xl"
          type="submit"
        >
          <ChevronRightIcon />
        </button>
        <input
          className="!absolute w-full bg-neutral-700 p-2 h-12 border-2 outline-none rounded-md transition-all duration-200 border-violet-400  focus:border-violet-700"
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
