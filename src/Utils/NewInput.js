import React from "react";
import { IoMdSend } from "react-icons/io";

const NewInput = (props) => {
  return (
    <div
      className={`rounded-full border border-gray-300 px-4 py-2 w-1/2 flex items-center gap-2 ${props.className}`}
    >
      <input
        type="text"
        className="border-0 outline-0 w-full"
        placeholder={props.placeholder}
      />
      <IoMdSend size={20} />
    </div>
  );
};

export default NewInput;
