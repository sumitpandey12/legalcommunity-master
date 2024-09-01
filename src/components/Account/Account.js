import React, { useEffect, useState } from "react";
import Avatar from "../../Utils/Avatars";
import Button from "../../Utils/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import FeedItem from "../Home/Feed/FeedItem";
import LibraryItem from "../../Utils/LibraryPostCard";
import UserContoller from "../../APIs/UserController";
import APIURLs from "../../APIs/APIUrls";

const feedLists = [
  {
    id: 1,
    full_name: "Sumit Pandey",
    user_profile:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: Date.now(),
    like_count: 120,
    comment_count: 120,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into",
    image_url:
      "https://images.unsplash.com/photo-1720719542373-9e9067e6be20?q=80&w=1467&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    full_name: "Sumit Pandey",
    user_profile:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    date: Date.now(),
    like_count: 120,
    comment_count: 120,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into",
    image_url:
      "https://images.unsplash.com/photo-1720719542373-9e9067e6be20?q=80&w=1467&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    full_name: "Sumit Pandey",
    user_profile:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: Date.now(),
    like_count: 120,
    comment_count: 120,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into",
    image_url:
      "https://images.unsplash.com/photo-1720719542373-9e9067e6be20?q=80&w=1467&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    full_name: "Sumit Pandey",
    user_profile:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: Date.now(),
    like_count: 120,
    comment_count: 120,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into",
    image_url:
      "https://images.unsplash.com/photo-1720719542373-9e9067e6be20?q=80&w=1467&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    full_name: "Sumit Pandey",
    user_profile:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: Date.now(),
    like_count: 120,
    comment_count: 120,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into",
    image_url:
      "https://images.unsplash.com/photo-1720719542373-9e9067e6be20?q=80&w=1467&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const libraryPosts = [
  {
    id: 1,
    userName: "Sumit Pandey",
    title: "LGBTQ Legal Code",
    profileURL:
      "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently",
    date: "11/11/2022",
    category: "Law",
    type: 1,
  },
  {
    id: 1,
    userName: "Sumit Pandey",
    title: "LGBTQ Legal Code",
    profileURL:
      "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently",
    date: "11/11/2022",
    category: "Law",
    type: 1,
  },
  {
    id: 1,
    userName: "Sumit Pandey",
    title: "LGBTQ Legal Code",
    profileURL:
      "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently",
    date: "11/11/2022",
    category: "Law",
    type: 1,
  },
  {
    id: 1,
    userName: "Sumit Pandey",
    title: "LGBTQ Legal Code",
    profileURL:
      "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently",
    date: "11/11/2022",
    category: "Law",
    type: 1,
  },
];

const Account = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const [user, setUser] = React.useState(null);

  const userController = new UserContoller();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await userController.getUserProfile();
    setUser(response);
    console.log(response);
  };

  const applyExpertHandler = async () =>{
    const response = await userController.applyForExpert();
    console.log(response);
  }

  return (
    <>
    {user && <div className="w-full flex flex-col items-center p-4">
      <div className="flex gap-4 border-b pb-4 w-full">
        <Avatar
          image={ user.profile ?? 
            "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          className={"w-28 h-28"}
        />
        <div className="flex flex-col gap-1 justify-center items-center">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-xl">{user.email}</p>
          <Button title="Edit Profile" />
        </div>
        <div className="flex gap-4 justify-center items-center border-l pl-4 border-r pr-4">
          <div className="flex flex-col gap-1 justify-center items-center">
            <p className="text-xl font-bold">Followers</p>{" "}
            <p className="text-xl">{user.follower_count}</p>
          </div>
          
          <div className="flex flex-col gap-1 justify-center items-center">
            <p className="text-xl font-bold">Following</p>{" "}
            <p className="text-xl">{user.following_count}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {user.user_type === "User" && <Button title="Apply for Expert" className="bg-red-900" onClick={applyExpertHandler} />}
          <Button title="Request Expert" onClick={() => {}} />
        </div>
      </div>
      <TabMenu isUser = {user.user_type !== "User"} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === 0 && <LegalQueryPost posts={feedLists} />}
      {selectedTab === 1 && <LibraryPost posts={libraryPosts} />}
    </div>}</>
  );
};

const LegalQueryPost = ({ posts }) => {
  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <FeedItem key={post.id} {...post} />
      ))}
    </div>
  );
};

const LibraryPost = ({ posts }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {posts.map((post) => (
        <LibraryItem key={post.id} {...post} />
      ))}
    </div>
  );
};

const TabMenu = ({ selectedTab, setSelectedTab, isUser }) => {
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
        <Tab value={0} label="Legal Query" />
        {isUser && <Tab value={1} label="Libary" />}
      </Tabs>
    </Box>
  );
};

export default Account;
