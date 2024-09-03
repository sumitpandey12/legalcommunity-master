import React, { useContext, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import NewInput from "../../Utils/NewInput";
import { Avatar } from "@mui/material";
import { blue, deepOrange } from "@mui/material/colors";
import { Link, Route, Routes } from "react-router-dom";
import ChatBot from "../ChatBot/ChatBot";
import { ChatContext } from "../../Context/ChatContext";
import APIURLs from "../../APIs/APIUrls";
import { socket } from "../../socket";
import Spinner from "../../Utils/Spinner";

const Chat = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const chatContext = useContext(ChatContext);

  useEffect(() => {
    function onConnect() {
      console.log("connected");
    }

    function onDisconnect() {
      console.log("disconnected");
    }

    function onFooEvent(value) {
      console.log(value);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);

  if (chatContext.messagesChat === null || chatContext.requestsChat === null) {
    return <Spinner />;
  }

  return (
    <div>
      <TabMenu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className="w-full p-4">
        {selectedTab === 0 ? (
          chatContext.messagesChat.length > 0 ? (
            chatContext.messagesChat.map((item, index) => (
              <ChatListTile isMessage={true} key={index} {...item} />
            ))
          ) : (
            <div>No Messages Found!</div>
          )
        ) : chatContext.requestsChat.length > 0 ? (
          chatContext.requestsChat.map((item, index) => (
            <ChatListTile isMessage={false} key={index} {...item} />
          ))
        ) : (
          <div>No Messages Found!</div>
        )}
      </div>
    </div>
  );
};

const ChatListTile = ({ isMessage, name, prfile, id }) => {
  return (
    <Link
      to={`${isMessage ? "message" : "request"}/${id}`}
      className="w-full px-4 py-2 border-b border-gray-300"
    >
      <div className="flex gap-4 items-center">
        <Avatar
          src={prfile}
          sx={{ bgcolor: isMessage ? deepOrange[500] : blue[500] }}
        >
          {name[0]?.toUpperCase()}
        </Avatar>
        <p className="text-md font-semibold">{name}</p>
      </div>
    </Link>
  );
};

const TabMenu = ({ selectedTab, setSelectedTab }) => {
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        color="secondary"
        value={selectedTab}
        onChange={handleChange}
        aria-label="secondary tabs example"
        indicatorColor="secondary"
      >
        <Tab value={0} label="Query Request" />
        <Tab value={1} label="Query Response" />
      </Tabs>
    </Box>
  );
};

export default Chat;
