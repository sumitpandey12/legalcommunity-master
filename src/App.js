import "./App.css";
import Home from "./components/Home/Home";
import Popular from "./components/Popular/Popular";
import Account from "./components/Account/Account";
import Library from "./components/Library/Library";
import ChatBot from "./components/ChatBot/ChatBot";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Post from "./components/Home/Post/Post";
import AuthContext from "./Context/AuthContext";
import AuthProvider from "./Context/AuthProvider";
import Chat from "./components/Chat/Chat";
import ChatLayout from "./components/Chat/ChatLayout";
import ChatItem from "./components/Chat/ChatItem";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="feeds" element={<Home />} />
            <Route path="popular" element={<Popular />} />
            <Route path="account" element={<Account />} />
            <Route path="library" element={<Library />} />
            <Route path="chatbot" element={<ChatBot />} />
            <Route path="post/:id" element={<Post />} />
            <Route path="chat" element={<ChatLayout />}>
              <Route index element={<Chat />} />
              <Route path=":id" element={<ChatItem />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
