import React from "react";
import Avatars from "../../../Utils/Avatars";

const Comment = ({ user_profile, image_url, className }) => {
  return (
    <div className={`p-2 flex items-start w-full ${className}`}>
      <Avatars image={user_profile} className="w-8 h-8" />
      <div className="flex flex-col items-start bg-amber-100 rounded-lg px-4 py-2 gap-1">
        <span className="font-bold text-sm">Sumit Pandey</span>
        <p className="text-lg text-start">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
      </div>
    </div>
  );
};

export default Comment;
