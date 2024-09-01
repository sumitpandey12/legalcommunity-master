import React, { useState } from "react";
import Card from "../../../Utils/Card";
import Avatars from "../../../Utils/Avatars";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineComment,
  AiFillCaretDown,
  AiFillCaretUp,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Button from "../../../Utils/Button";
import FeedMenu from "./FeedMoreMenu";
import { Tooltip } from "@mui/material";

const FeedItem = ({
  id,
  full_name,
  user_profile,
  date,
  like_count,
  comment_count,
  description,
  image_url,
}) => {
  const navigate = useNavigate();
  const [isUpVote, setUpVote] = React.useState(null);

  const [isMoreOpen, setMoreOpen] = useState(false);

  const handleClick = () => {
    navigate("/post/" + id);
  };

  const toggleMore = () => {
    setMoreOpen(!isMoreOpen);
  };

  const handlerMoreClick = () => {};

  return (
    <Card className="w-2/3 mt-4">
      <div className="flex w-full items-center justify-between border-b pb-3">
        <div className="flex items-center space-x-3">
          <div
            className={`h-8 w-8 rounded-full bg-slate-400 bg-[url(${user_profile})]`}
          ></div>
          <div className="text-lg font-bold text-slate-700">{full_name}</div>
        </div>
        <div className="flex items-center">
          <Button title="Follow" className="w-min h-min px-4 py-1" />
          <FeedMenu />
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
            <div className="flex cursor-pointer items-center transition hover:text-slate-600">
              <AiOutlineComment size={20} />
              <span>{comment_count}</span>
            </div>
            <div className="flex gap-1 items-center">
              <div
                onClick={() => setUpVote(true)}
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
                  onClick={() => setUpVote(false)}
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
