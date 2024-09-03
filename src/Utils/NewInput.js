import React, { useRef } from "react";
import { IoMdSend } from "react-icons/io";

const NewInput = (props) => {
  const messageRef = useRef(null);

  const onSend = () => {
    if (messageRef.current.value.length < 4) return;
    props.onSend(messageRef.current.value);
    messageRef.current.value = "";
  };

  return (
    <div
      className={`rounded-full border border-gray-300 px-4 py-2 w-1/2 flex items-center gap-2 ${props.className}`}
    >
      <input
        ref={messageRef}
        type="text"
        className="border-0 outline-0 w-full"
        placeholder={props.placeholder}
      />
      <IoMdSend className="cursor-pointer" onClick={onSend} size={20} />
    </div>
  );
};

export default NewInput;
