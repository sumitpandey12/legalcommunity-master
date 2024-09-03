import React, { useContext, useEffect, useState } from "react";
import Avatars from "../../../Utils/Avatars";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineComment,
  AiFillCaretUp,
  AiFillCaretDown,
} from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiDownvote, BiSolidDownvote } from "react-icons/bi";

import Comment from "./Comment";
import Button from "../../../Utils/Button";
import Divider from "../../../Utils/Divider";
import CommentTextField from "./CommentTextField";
import PublicController from "../../../APIs/PublicController";
import { useParams } from "react-router-dom";
import { FeedContext } from "../../../Context/FeedContext";
import { Avatar, Tooltip } from "@mui/material";
import UserContoller from "../../../APIs/UserController";
import AuthContext from "../../../Context/AuthContext";
import { PopupContext } from "../../../Context/PopupContext";

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
  const feedContext = useContext(FeedContext);

  const [isUpVote, setUpVote] = React.useState(null);

  const params = useParams();
  const [comments, setComments] = useState([]);

  const [post, setPost] = useState(null);

  const publicController = new PublicController();
  const userController = new UserContoller();

  const authContext = React.useContext(AuthContext);
  const popupContext = React.useContext(PopupContext);

  useEffect(() => {
    getPost();
  }, [params.id]);

  useEffect(() => {
    getComments();
  }, []);

  const getPost = async () => {
    const response = feedContext.getPost(params.id);
    console.log("postsssss", response);
    setPost(response);
  };

  const getComments = async () => {
    const response = await publicController.getComments(params.id);
    setComments(response);
  };

  const postComment = async (comment) => {
    const response = await userController.commentPost({
      query_id: params.id,
      comment: comment,
    });
    getComments();
    console.log(response);
  };

  const voteHandler = async (vote, v) => {
    if (!authContext.isLogined) {
      popupContext.toggleLogin(true);
      return;
    }
    if (vote === 1) {
      await feedContext.upVotePost(params.id);
      setUpVote(true);
    } else if (vote === -1) {
      await feedContext.downVotePost(params.id);
      setUpVote(false);
    } else {
      await feedContext.NullVote(params.id, v);
      setUpVote(null);
      return;
    }
    getPost();
  };

  const followHandler = async () => {
    if (!authContext.isLogined) {
      popupContext.toggleLogin(true);
      return;
    }
    const response = await userController.followUnfollow({
      friend_id: post.author_id,
    });
    console.log(response);
  };

  return (
    <div className=" flex flex-col items-start w-2/3">
      {post && (
        <div className="p-4">
          <div className="flex justify-between">
            <div className="flex items-center gap-2 mb-2">
              <Avatar image={post.profile} />
              <span className="font-bold text-lg">{post.name}</span>
            </div>
            <Button
              onClick={followHandler}
              title="Follow"
              className="w-min h-min px-4 py-1"
            />
          </div>
          <p className="text-lg my-4 text-start">{post.query_content}</p>
          {post.file && (
            <img
              src={post.file}
              className="h-80 w-full rounded-xl object-cover"
              style={{ objectFit: "fill" }}
            />
          )}
          <div className="mt-4">
            <div className="flex items-center justify-between text-slate-500">
              <div className="flex space-x-4 md:space-x-8">
                <div className="flex gap-1 items-center">
                  <div
                    onClick={() => {
                      if (isUpVote === true) {
                        voteHandler(0, post.like_count - 1);
                        return;
                      }
                      voteHandler(1);
                    }}
                    className={`flex gap-1 cursor-pointer items-center transition hover:text-slate-600 ${
                      isUpVote
                        ? "rounded-full bg-orange-950 px-3 py-1"
                        : "rounded-full bg-orange-100 px-3 py-1"
                    }`}
                  >
                    <AiFillCaretUp
                      size={20}
                      className={isUpVote && "text-white"}
                    />
                    <span className={isUpVote ? `text-white` : "text-black"}>
                      UpVote
                    </span>
                  </div>
                  <span>{post.vote_count}</span>
                  <Tooltip title="DownVote" placement="top">
                    <div
                      onClick={() => {
                        if (isUpVote === false) {
                          voteHandler(0, post.vote_count + 1);
                          return;
                        }
                        voteHandler(-1);
                      }}
                      className="flex gap-1 items-center transition hover:text-slate-600 cursor-pointer px-2"
                    >
                      <AiFillCaretDown size={20} />
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* comment */}
      <Divider className="my-2" />

      <CommentTextField
        className={"p-2 mb-2"}
        user_profile={item.user_profile}
        onPost={(comment) => {
          if (!authContext.isLogined) {
            popupContext.toggleLogin(true);
            return;
          }
          postComment(comment);
        }}
        placeholder="Write a comment..."
      />

      <div className="p-2 px-6">
        {comments &&
          comments.map((item, index) => (
            <Comment
              key={index}
              user_profile={item.user_name}
              image_url={item.user_profile}
              comment={item.comment}
            />
          ))}
      </div>
    </div>
  );
};

export default Post;
