import React from "react";
import Button from "../../../Utils/Button";
import Avatars from "../../../Utils/Avatars";

const CommentTextField = ({ user_profile, onPost, placeholder, className }) => {
  const [comment, setComment] = React.useState("");
  const onInputChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const onPostClick = () => {
    onPost(comment);
    setComment("");
  };

  return (
    <div className={`flex items-center gap-2 w-full ${className}`}>
      <Avatars image={user_profile} />
      <input
        onChange={onInputChange}
        type="text"
        className="border-0 outline-0 w-full rounded-full bg-amber-50 px-4 py-2"
        placeholder={placeholder}
      />
      <Button title="Post" onClick={onPostClick} />
    </div>
  );
};

export default CommentTextField;
