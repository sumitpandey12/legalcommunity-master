import { Avatar, IconButton } from "@mui/material";
import { blue, deepOrange } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";
import NewInput from "../../Utils/NewInput";
import { BiArrowBack } from "react-icons/bi";

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
    message: "Hi, How Are You ?",
  },
  {
    role: "user",
    message: "I am fine, What is your name ?",
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
    message: "Hi, How Are You ?",
  },
  {
    role: "user",
    message: "I am fine, What is your name ?",
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
    message: "Hi, How Are You ?",
  },
  {
    role: "user",
    message: "I am fine, What is your name ?",
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
    message: "Hi, How Are You ?",
  },
  {
    role: "user",
    message: "I am fine, What is your name ?",
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
    message: "Hi, How Are You ?",
  },
  {
    role: "user",
    message: "I am fine, What is your name ?",
  },
  {
    role: "bot",
    message: "Hi, How Are You ?",
  },
  {
    role: "user",
    message: "I am fine, What is your name ?",
  },
];

const ChatItem = () => {
  const [isAccepted, setIsAccepted] = React.useState(true);

  return (
    <div className="relative w-full h-full flex flex-col">
      <ChatListTile />
      {isAccepted ? (
        <>
          <div className="flex-1 p-4 overflow-y-auto">
            {chatHistory.map((chat, index) => (
              <Chat
                key={index}
                user={chat.role === "user"}
                message={chat.message}
              />
            ))}
          </div>

          <div className="w-full bg-white z-20 flex justify-center sticky bottom-0">
            <NewInput placeholder="Type here..." className="w-2/3 my-3" />
          </div>
        </>
      ) : (
        <div className="flex-1 flex justify-center items-center">
          <p className="text-gray-500 text-lg">Request is pending...</p>
        </div>
      )}
    </div>
  );
};

const ChatListTile = ({ one }) => {
  return (
    <div className="sticky top-0 bg-white z-20 flex gap-4 items-center w-full px-4 py-2 border-b border-gray-300">
      <IconButton
        aria-label="delete"
        onClick={() => {
          window.history.back();
        }}
      >
        <BiArrowBack />
      </IconButton>
      <Avatar sx={{ bgcolor: one ? deepOrange[500] : blue[500] }}>S</Avatar>
      <p className="text-md font-semibold">Sumit Pandey</p>
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
export default ChatItem;
