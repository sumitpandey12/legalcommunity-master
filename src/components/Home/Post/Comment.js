import React from "react";
import Avatars from "../../../Utils/Avatars";
import { Avatar } from "@mui/material";

const Comment = ({ user_profile, image_url, className, comment }) => {
  return (
    <div className={`p-2 flex items-start w-full ${className}`}>
      <Avatar image={user_profile} className="w-8 h-8" />
      <div className="flex flex-col items-start bg-amber-100 rounded-lg px-4 py-2 gap-1">
        <span className="font-bold text-sm">Sumit Pandey</span>
        <p className="text-lg text-start">{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
