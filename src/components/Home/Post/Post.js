import React, { useEffect, useState } from "react";
import Avatars from "../../../Utils/Avatars";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineComment,
} from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiDownvote, BiSolidDownvote } from "react-icons/bi";

import Comment from "./Comment";
import Button from "../../../Utils/Button";
import Divider from "../../../Utils/Divider";
import CommentTextField from "./CommentTextField";
import PublicController from "../../../APIs/PublicController";

const item = {
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
};

const Post = () => {
  const [posts, setPosts] = useState([]);
  const publicController = new PublicController();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const posts = await publicController.getPosts();
    console.log(posts);
    setPosts(posts);
  };

  return (
    <div className=" flex flex-col items-start w-2/3">
      <div className="p-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 mb-2">
            <Avatars image={item.user_profile} />
            <span className="font-bold text-lg">{item.full_name}</span>
          </div>
          <Button title="Follow" className="w-min h-min px-4 py-1" />
        </div>
        <p className="text-lg my-4 text-start">{item.description}</p>
        <img
          src={item.image_url}
          className="h-80 w-full rounded-xl object-cover"
          style={{ objectFit: "fill" }}
        />
        <div className="flex gap-4 mt-4">
          <div className="flex items-center bg-amber-950 px-4 py-2 w-min rounded-lg">
            <BiDownvote color="white" />
            <span className="mx-4 font-bold text-white">{item.like_count}</span>
            <div className="rotate-180">
              <BiDownvote color="white" />
            </div>
          </div>
          <div className="flex items-center bg-amber-950 px-4 py-2 w-min rounded-lg">
            <AiOutlineComment color="white" />
            <span className="ml-3 font-bold text-white">
              {item.comment_count}
            </span>
          </div>
        </div>
      </div>

      {/* comment */}
      <Divider className="my-2" />

      <CommentTextField
        className={"p-2 mb-2"}
        user_profile={item.user_profile}
        onPost={(comment) => {
          console.log(comment);
        }}
        placeholder="Write a comment..."
      />

      <div className="p-2 px-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <Comment
            key={index}
            user_profile={item.user_profile}
            image_url={item.image_url}
          />
        ))}
      </div>
    </div>
  );
};

export default Post;
