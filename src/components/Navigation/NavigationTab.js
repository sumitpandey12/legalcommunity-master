import React, { useContext } from "react";
import {
  RiHomeLine,
  RiCompassDiscoverFill,
  RiAccountCircleLine,
  RiRobot3Fill,
} from "react-icons/ri";
import { IoChatbubblesOutline } from "react-icons/io5";

import { IoLibrary } from "react-icons/io5";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import Utils from "../../Utils/Utils";

const NavigationTab = ({ id, name, isActive, onClick }) => {
  const authContext = useContext(AuthContext);

  if (authContext.user === null && (id === 3 || id === 6)) return null;

  return (
    <Link
      to={
        id === 1
          ? "/feeds"
          : id === 3
          ? "/account"
          : id === 4
          ? "/library"
          : id === 5
          ? "/chatbot"
          : id === 6
          ? "/chat"
          : "/"
      }
      onClick={() => onClick(id)}
      style={{ backgroundColor: isActive ? Utils.color.secondary : "" }}
      className={`flex justify-center items-center gap-4 rounded px-4 py-2 my-2 cursor-pointer ${
        isActive ? "bg-amber-700" : ""
      }`}
    >
      {getTabIcon(id, isActive)}
      <span className={"text-white"}>{name}</span>
    </Link>
  );
};

function getTabIcon(id, active) {
  switch (id) {
    case 1:
      return <RiHomeLine size={20} color={"#fff"} />;
    case 2:
      return <RiCompassDiscoverFill size={20} color={"#fff"} />;
    case 3:
      return <RiAccountCircleLine size={20} color={"#fff"} />;
    case 4:
      return <IoLibrary size={20} color={"#fff"} />;
    case 5:
      return <RiRobot3Fill size={20} color={"#fff"} />;
    case 6:
      <IoChatbubblesOutline size={20} color={"#fff"} />;
    default:
      return <IoChatbubblesOutline size={20} color={"#fff"} />;
  }
}

export default NavigationTab;
