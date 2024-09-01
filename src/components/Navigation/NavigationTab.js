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

const NavigationTab = ({ id, name, isActive, onClick }) => {
  const authContext = useContext(AuthContext);

  if (authContext.user === null && id === 3) return null;

  return (
    <Link
      to={
        id === 1
          ? "/feeds"
          : id === 2
          ? "/popular"
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
      className={`flex justify-center items-center gap-4 rounded px-4 py-2 my-2 cursor-pointer ${
        isActive ? "bg-amber-950" : ""
      }`}
    >
      {getTabIcon(id, isActive)}
      <span className={`${isActive ? "text-white" : "text-black"}`}>
        {name}
      </span>
    </Link>
  );
};

function getTabIcon(id, active) {
  switch (id) {
    case 1:
      return <RiHomeLine size={20} color={`${active ? "#fff" : "#000"}`} />;
    case 2:
      return (
        <RiCompassDiscoverFill
          size={20}
          color={`${active ? "#fff" : "#000"}`}
        />
      );
    case 3:
      return (
        <RiAccountCircleLine size={20} color={`${active ? "#fff" : "#000"}`} />
      );
    case 4:
      return <IoLibrary size={20} color={`${active ? "#fff" : "#000"}`} />;
    case 5:
      return <RiRobot3Fill size={20} color={`${active ? "#fff" : "#000"}`} />;
    case 6:
      <IoChatbubblesOutline size={20} color={`${active ? "#fff" : "#000"}`} />;
    default:
      return (
        <IoChatbubblesOutline size={20} color={`${active ? "#fff" : "#000"}`} />
      );
  }
}

export default NavigationTab;
