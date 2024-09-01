import React from "react";
import NewInput from "../../Utils/NewInput";
import Avatar from "../../Utils/Avatars";

const chatHistory = [
  {
    role: "user",
    message: "Hey",
  },
  {
    role: "bot",
    message: "Hi, How Are You ?",
  },
  {
    role: "user",
    message: "I am fine, What is your name ?",
  },
  {
    role: "bot",
    message: "My name is AI ChatBot",
  },
  {
    role: "user",
    message: "Hey",
  },
  {
    role: "bot",
    message: "Hi, How Are You ?",
  },
  {
    role: "user",
    message: "I am fine, What is your name ?",
  },
  {
    role: "bot",
    message: "My name is AI ChatBot",
  },
  {
    role: "user",
    message: "Hey",
  },
  {
    role: "bot",
    message: "Hi, How Are You ?",
  },
  {
    role: "user",
    message: "I am fine, What is your name ?",
  },
  {
    role: "bot",
    message: "My name is AI ChatBot",
  },
  {
    role: "user",
    message: "Hey",
  },
  {
    role: "bot",
    message: "Hi, How Are You ?",
  },
  {
    role: "user",
    message: "I am fine, What is your name ?",
  },
  {
    role: "bot",
    message: "My name is AI ChatBot",
  },
  {
    role: "user",
    message: "Hey",
  },
  {
    role: "bot",
    message: "Hi, How Are You ?",
  },
  {
    role: "user",
    message: "I am fine, What is your name ?",
  },
  {
    role: "bot",
    message: "My name is AI ChatBot",
  },
];

const ChatBot = () => {
  return (
    <div className="relative w-full h-full">
      <div className="p-4 overflow-y-auto">
        {chatHistory.map((chat, index) => (
          <Chat
            key={index}
            user={chat.role === "user"}
            message={chat.message}
          />
        ))}
      </div>
      <div className="w-full sticky bottom-0 bg-white z-20 flex justify-center absolute inset-x-0 bottom-5">
        <NewInput placeholder="Type here..." className="w-2/3 my-3" />
      </div>
    </div>
  );
};

const Chat = ({ user, message }) => {
  return (
    <div
      className={`flex ${
        user ? "flex-row-reverse" : "flex-row"
      } w-full items-end gap-1`}
    >
      <Avatar
        image={
          "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        className={"w-6 h-6"}
      />

      <p
        className={`${
          user
            ? "bg-amber-950 text-white rounded-bl-xl"
            : "bg-amber-100 rounded-br-xl"
        } rounded-tl-xl  rounded-tr-xl px-4 py-2`}
      >
        {message}
      </p>
    </div>
  );
};

export default ChatBot;
