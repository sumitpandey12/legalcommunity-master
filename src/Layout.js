import React from "react";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";
import { Outlet } from "react-router-dom";
import { ChatProvider } from "./Context/ChatContext";
import { PopupProvider } from "./Context/PopupContext";

const Layout = () => {
  return (
    <PopupProvider>
      <ChatProvider>
        <div className="App">
          <Header className="w-full z-50" />
          <div
            className="flex flex-row w-full"
            style={{ height: "calc(100vh - 4rem)" }}
          >
            <Navigation className="w-1/5 sticky top-0" />
            <div className="w-4/5 scrollbar-hide overflow-y-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </ChatProvider>
    </PopupProvider>
  );
};

export default Layout;
