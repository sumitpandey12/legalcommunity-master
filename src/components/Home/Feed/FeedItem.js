import React, { useContext, useState } from "react";
import Card from "../../../Utils/Card";
import {
  AiOutlineComment,
  AiFillCaretDown,
  AiFillCaretUp,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Button from "../../../Utils/Button";
import FeedMenu from "./FeedMoreMenu";
import { Tooltip } from "@mui/material";
import { FeedContext } from "../../../Context/FeedContext";
import UserContoller from "../../../APIs/UserController";
import AuthContext from "../../../Context/AuthContext";
import { PopupContext } from "../../../Context/PopupContext";

const FeedItem = ({
  id,
  auther_id,
  full_name,
  user_profile,
  date,
  like_count,
  comment_count,
  description,
  image_url,
  is_following,
}) => {
  const navigate = useNavigate();
  const [isUpVote, setUpVote] = React.useState(null);

  const [isMoreOpen, setMoreOpen] = useState(false);
  const authContext = useContext(AuthContext);

  const feedContext = useContext(FeedContext);
  const userController = new UserContoller();
  const popupContext = useContext(PopupContext);

  const handleClick = () => {
    navigate("/post/" + id);
  };

  const voteHandler = async (vote, v) => {
    if (vote === 1) {
      feedContext.upVotePost(id);
      setUpVote(true);
    } else if (vote === -1) {
      feedContext.downVotePost(id);
      setUpVote(false);
    } else {
      feedContext.NullVote(id, vote);
      setUpVote(null);
      return;
    }
  };

  const followHandler = async () => {
    console.log("Following...", auther_id);
    const response = await userController.followUnfollow({
      friend_id: auther_id,
    });
    feedContext.refresh();
  };

  const reportPostHandler = async () => {
    const response = await userController.reportQuery({ post_id: id });
    console.log(response);
  };

  return (
    <Card className="w-full mt-4">
      <div className="flex w-full items-center justify-between border-b pb-3">
        <div
          onClick={() => {
            if (!authContext.isLogined) {
              popupContext.toggleLogin(true);
              return;
            }
            navigate("/account/" + auther_id);
          }}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <div
            className={`h-8 w-8 rounded-full bg-slate-400 bg-[url(${user_profile})]`}
          ></div>
          <div className="text-lg font-bold text-slate-700">{full_name}</div>
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => {
              if (!authContext.isLogined) {
                popupContext.toggleLogin(true);
                return;
              }
              followHandler();
            }}
            title={is_following === 0 ? "Follow" : "Unfollow"}
            className={`w-min h-min px-4 py-1 ${
              is_following !== 0 && "bg-gray-300"
            }`}
          />
          <FeedMenu id={id} content={description} author_id={auther_id} />
        </div>
      </div>

      <p
        onClick={handleClick}
        className="text-lg my-4 text-start cursor-pointer"
      >
        {description}
      </p>
      {image_url && (
        <img
          src={image_url}
          className="h-80 w-full rounded-xl object-cover"
          style={{ objectFit: "fill" }}
        />
      )}

      <div className="mt-4">
        <div className="flex items-center justify-between text-slate-500">
          <div className="flex space-x-4 md:space-x-8">
            <div
              onClick={() => {
                if (!authContext.isLogined) {
                  popupContext.toggleLogin(true);
                  return;
                }
                handleClick();
              }}
              className="flex cursor-pointer items-center transition hover:text-slate-600"
            >
              <AiOutlineComment size={20} />
              <span>{comment_count}</span>
            </div>
            <div className="flex gap-1 items-center">
              <div
                onClick={() => {
                  if (!authContext.isLogined) {
                    popupContext.toggleLogin(true);
                    return;
                  }
                  if (isUpVote === true) {
                    voteHandler(0, like_count - 1);
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
                <AiFillCaretUp size={20} className={isUpVote && "text-white"} />
                <span className={isUpVote ? `text-white` : "text-black"}>
                  UpVote
                </span>
              </div>
              <span>{like_count}</span>
              <Tooltip title="DownVote" placement="top">
                <div
                  onClick={() => {
                    if (!authContext.isLogined) {
                      popupContext.toggleLogin(true);
                      return;
                    }
                    if (isUpVote === false) {
                      voteHandler(0, like_count + 1);
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
    </Card>
  );
};

export default FeedItem;
