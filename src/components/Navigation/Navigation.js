import React, { useContext } from "react";
import NavigationTab from "./NavigationTab";
import Divider from "../../Utils/Divider";
import AuthContext from "../../Context/AuthContext";
import { PopupContext } from "../../Context/PopupContext";
import Utils from "../../Utils/Utils";

const navigationItem = [
  {
    id: 1,
    name: "Home",
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

const Navigation = (props) => {
  const [isActive, setIsActive] = React.useState(1);

  const authContext = useContext(AuthContext);
  const popupContext = useContext(PopupContext);

  const handleClick = (id) => {
    if ((id === 3 || id === 6) && !authContext.isLogined) {
      popupContext.toggleLogin(true);
      return;
    }

    setIsActive(id);
  };

  return (
    <div
      style={{ backgroundColor: Utils.color.primary }}
      className={`border-r border-gray-500 p-4 bg-slate-900 ${props.className}`}
    >
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
