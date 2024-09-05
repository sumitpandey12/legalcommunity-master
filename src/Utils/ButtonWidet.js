import React from "react";
import Utils from "./Utils";

const ButtonWidet = (props) => {
  return (
    <div
      style={{ backgroundColor: Utils.color.tertiary }}
      onClick={props.onClick}
      className={`bg-amber-950 rounded-full px-6 py-2 text-white font-bold cursor-pointer ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default ButtonWidet;
