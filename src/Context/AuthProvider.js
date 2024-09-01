import React from "react";
import AuthContext from "./AuthContext";
import APIURLs from "../APIs/APIUrls";
import AuthController from "../APIs/AuthController";

const AuthProvider = (props) => {
  const authController = new AuthController();

  const [user, setUser] = React.useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const login = async (user) => {
    const response = await authController.login(user);
    if (response !== false) {
      console.log(response);
      setUser(response);
      localStorage.setItem("user", JSON.stringify(response));
      return true;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.setItem("user", null);
  };

  const registerHandler = async (user) => {
    try {
      // const response = await fetch(APIURLs.baseURL + "/auth/register", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(user),
      // });
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      // const data = await response.json();
      // console.log(data);
      // if (data.code === 300) {
      //   alert(data.message);
      //   return;
      // }
      // if (data.code === 200) {
      //   login(data.data);
      //   return true;
      // }

      const response = await authController.register(user);
      if (response) {
        login(response);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const initData = {
    user: user,
    login: login,
    logout: logout,
    register: registerHandler,
  };

  return (
    <AuthContext.Provider value={initData}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
