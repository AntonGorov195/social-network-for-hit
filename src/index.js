import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomeScreen from "./page/HomeScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Posts from "./page/Posts";
import Login from "./page/Login";
import Search from "./page/Search";
import PostWrite from "./page/PostWrite";
import PageNotFound from "./page/PageNotFound";
import EditPost from "./page/EditPost";
import EditGroup from "./page/EditGroup";
import EditUser from "./page/EditUser";
import Chat from "./page/Chat";
import GroupPosts from "./page/GroupPosts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <header
            style={{
                display: "flex",
                // justifyContent: "center",
                borderStyle: "none",
                borderBottomStyle: "solid",
                borderColor: "var(--color-dark)",
                padding: "10px",
                borderWidth: "8px",
            }}
        >
            <button
                style={{
                    backgroundColor: "var(--color-dark)",
                    color: "var(--color-light)",
                    borderStyle: "none",
                    padding: "10px",
                    borderRadius: "10px",
                    fontSize: "1.3rem",
                    cursor: "pointer",
                }}
                onClick={(e) => {
                    localStorage.removeItem("token");
                    window.location.href =
                        window.location.protocol + "//" + window.location.host;
                }}
            >
                Logout
            </button>
        </header>
        <BrowserRouter>
            <Routes>
                <Route index element={<HomeScreen />} />
                <Route path="posts" element={<Posts />} />
                <Route path="edit-group" element={<EditGroup />} />
                <Route path="edit-user" element={<EditUser />} />
                <Route path="chat" element={<Chat />} />
                <Route path="group-posts" element={<GroupPosts />} />
                <Route path="edit-post" element={<EditPost />} />
                <Route path="login" element={<Login />} />
                <Route path="search" element={<Search />} />
                <Route path="post-write" element={<PostWrite />} />
                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
