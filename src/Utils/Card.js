import React from "react";

const Card = (props) => {
  return (
    <div
      className={`whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-white p-4 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default Card;
