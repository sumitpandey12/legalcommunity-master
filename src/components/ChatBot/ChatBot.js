import React, { useEffect } from "react";
import NewInput from "../../Utils/NewInput";
import Avatar from "../../Utils/Avatars";
import Utils from "../../Utils/Utils";
import ChatController from "../../APIs/ChatController";
import AuthContext from "../../Context/AuthContext";
import Button from "../../Utils/Button";
import { PopupContext } from "../../Context/PopupContext";

const ChatBot = () => {
  const [chats, setChats] = React.useState([]);
  const chatController = new ChatController();
  const authContext = React.useContext(AuthContext);
  const popupContext = React.useContext(PopupContext);

  const createChat = async () => {
    console.log("create chat");
    const chat = await chatController.createChat();
    console.log(chat);
    setChats([...chats, chat]);
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="h-full p-4 overflow-y-auto">
        {authContext.isLogined ? (
          chats.map((chat, index) => (
            <Chat
              key={index}
              user={chat.role === "user"}
              message={chat.message}
            />
          ))
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center gap-2">
            <div className="text-white text-lg font-semibold">
              Welcome, to the AI Expert. Login to get reponses.
            </div>
            <Button
              title="Login"
              onClick={() => {
                popupContext.toggleLogin(true);
              }}
            />
          </div>
        )}
      </div>
      <div
        style={{ backgroundColor: Utils.color.primary }}
        className="w-full fixed bottom-0 left-32 inset-x-0 flex justify-center"
      >
        <NewInput
          onSend={() => createChat()}
          placeholder="Type here..."
          className="w-2/3 my-3"
          disabled={!authContext.isLogined}
        />
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
        style={{ backgroundColor: Utils.color.secondary }}
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
