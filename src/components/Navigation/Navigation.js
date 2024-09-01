import React from "react";
import NavigationTab from "./NavigationTab";
import {
  RiHomeLine,
  RiCompassDiscoverFill,
  RiAccountCircleLine,
  RiRobot3Fill,
} from "react-icons/ri";
import { IoLibrary } from "react-icons/io5";
import { Link } from "react-router-dom";
import Divider from "../../Utils/Divider";

const navigationItem = [
  {
    id: 1,
    name: "Home",
  },
  {
    id: 2,
    name: "Popular",
  },
  {
    id: 3,
    name: "Account",
  },
  {
    id: 4,
    name: "Library",
  },
  {
    id: 5,
    name: "Chat Bot",
  },
];

const requestList = [
  {
    id: 3,
    name: "Account",
  },
  {
    id: 4,
    name: "Library",
  },
  {
    id: 5,
    name: "Chat Bot",
  },
];

const Navigation = (props) => {
  const [isActive, setIsActive] = React.useState(1);

  const handleClick = (id) => {
    setIsActive(id);
  };

  return (
    <div className={`border p-4  ${props.className}`}>
      <div className="items-center">
        {navigationItem.map((item) => (
          <NavigationTab
            key={item.id}
            {...item}
            isActive={isActive === item.id}
            onClick={() => handleClick(item.id)}
          />
        ))}
        <Divider className="mt-4 mb-2" />
        <NavigationTab
          id={6}
          name="Chat"
          isActive={isActive === 6}
          onClick={() => handleClick(6)}
        />
      </div>
    </div>
  );
};

export default Navigation;
