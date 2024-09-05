import { Avatar, IconButton } from "@mui/material";
import { blue, deepOrange } from "@mui/material/colors";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NewInput from "../../Utils/NewInput";
import { BiArrowBack } from "react-icons/bi";
import { ChatContext } from "../../Context/ChatContext";
import ChatController from "../../APIs/ChatController";
import AuthContext from "../../Context/AuthContext";
import Spinner from "../../Utils/Spinner";
import Utils from "../../Utils/Utils";

const ChatItem = ({ isMessage }) => {
  const [isAccepted, setIsAccepted] = React.useState(true);
  const [chat, setChat] = React.useState({});
  const [chatHistory, setChatHistory] = React.useState(null);
  const chatContext = React.useContext(ChatContext);
  const params = useParams();

  const chatController = new ChatController();
  const authContext = React.useContext(AuthContext);

  useEffect(() => {
    loadChats();
  }, []);

  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChats = async () => {
    if (isMessage) {
      await setChat(chatContext.getMessagesChat(params.id));
    } else {
      await setChat(chatContext.getRequestsChat(params.id));
    }
  };

  const loadChatHistory = async () => {
    const res = await chatController.getMessages({
      chat_id: params.id,
    });
    setChatHistory(res);
  };

  const sendMessage = async (message) => {
    const res = await chatController.addMessage({
      chat_id: params.id,
      message_type: "Text",
      message: message,
    });
    loadChatHistory();
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      <ChatListTile isMessage={true} {...chat.user} />
      {isAccepted ? (
        <>
          <div className="flex-1 p-4 overflow-y-auto">
            {chatHistory !== null && chatHistory.length > 0 ? (
              chatHistory.map((chat, index) => (
                <Chat
                  key={index}
                  user={chat.sender_id === authContext.user.id}
                  message={chat.message}
                />
              ))
            ) : chatHistory !== null ? (
              <div className="text-white">No messages</div>
            ) : (
              <Spinner />
            )}
          </div>

          <div
            style={{ color: Utils.color.white }}
            className="w-full fixed bottom-0 left-32 inset-x-0 flex justify-center"
          >
            <NewInput
              onSend={sendMessage}
              placeholder="Type here..."
              className="w-2/3 my-3"
            />
          </div>
        </>
      ) : (
        <div className="flex-1 flex justify-center items-center">
          <p className="text-gray-500 text-lg text-white">
            Request is pending...
          </p>
        </div>
      )}
    </div>
  );
};

const ChatListTile = ({ isMessage, name, profile, id }) => {
  return (
    <div
      style={{ backgroundColor: Utils.color.primary }}
      className="sticky top-0 bg-white z-20 flex gap-4 items-center w-full px-4 py-2 border-b border-gray-500"
    >
      <IconButton
        aria-label="delete"
        onClick={() => {
          window.history.back();
        }}
        style={{ color: Utils.color.white }}
      >
        <BiArrowBack />
      </IconButton>
      <Avatar sx={{ bgcolor: isMessage ? deepOrange[500] : blue[500] }}>
        {name && name[0].toUpperCase()}
      </Avatar>
      <p className="text-md font-semibold text-white">{name}</p>
    </div>
  );
};

const Chat = ({ user, message }) => {
  return (
    <div
      className={`flex ${
        user ? "flex-row-reverse" : "flex-row"
      } w-full items-end gap-1 my-1`}
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
export default ChatItem;
