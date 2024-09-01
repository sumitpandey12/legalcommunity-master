import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import NewInput from "../../Utils/NewInput";
import { Avatar } from "@mui/material";
import { blue, deepOrange } from "@mui/material/colors";
import { Link, Route, Routes } from "react-router-dom";
import ChatBot from "../ChatBot/ChatBot";

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
];

const Chat = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  return (
    <div>
      <TabMenu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className="w-full p-4">
        {chatHistory.map((item, index) => (
          <ChatListTile key={index} {...item} />
        ))}
      </div>
      <Routes>
        <Route path="/chat/:id" element={<ChatBot />} />
      </Routes>
    </div>
  );
};

const ChatListTile = ({ one }) => {
  return (
    <Link to={"1"} className="w-full px-4 py-2 border-b border-gray-300">
      <div className="flex gap-4 items-center">
        <Avatar sx={{ bgcolor: one ? deepOrange[500] : blue[500] }}>S</Avatar>
        <p className="text-md font-semibold">Sumit Pandey</p>
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
