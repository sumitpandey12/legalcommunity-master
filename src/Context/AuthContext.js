import { createContext } from "react";

const AuthContext = createContext({
  user: null,
  login: (user) => {},
  logout: () => {},
  register: (user) => {},
});

export default AuthContext;
