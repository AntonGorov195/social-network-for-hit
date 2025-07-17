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
import AnalyticsPage from "./page/AnalyticsPage";
import EditGroup from "./page/EditGroup";
import EditUser from "./page/EditUser";
import Chat from "./page/Chat";
import GroupPosts from "./page/GroupPosts";
import GroupPage from "./page/GroupPage";
import GroupCreate from "./page/GroupCreate";
import Chats from "./page/Chats";

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
                gap: "5px",
            }}
        >
            <button
                className="btn-small"
                onClick={(e) => {
                    localStorage.removeItem("token");
                    window.location.href =
                        window.location.protocol + "//" + window.location.host;
                }}
            >
                Logout
            </button>
            <button
                className="btn-small"
                onClick={(e) => {
                    window.location.href =
                        window.location.protocol +
                        "//" +
                        window.location.host +
                        "/chats";
                }}
            >
                Chat
            </button>
            <button
                className="btn-small"
                onClick={(e) => {
                    window.location.href =
                        window.location.protocol +
                        "//" +
                        window.location.host +
                        "/posts";
                }}
            >
                Posts
            </button>
            <button
                className="btn-small"
                onClick={(e) => {
                    window.location.href =
                        window.location.protocol +
                        "//" +
                        window.location.host +
                        "/edit-user";
                }}
            >
                Edit Profile
            </button>
            <button
                className="btn-small"
                onClick={(e) => {
                    window.location.href =
                        window.location.protocol +
                        "//" +
                        window.location.host +
                        "/create-group";
                }}
            >
                Create New Group
            </button>
            <button
                className="btn-small"
                onClick={(e) => {
                    window.location.href =
                        window.location.protocol +
                        "//" +
                        window.location.host +
                        "/groups";
                }}
            >
                View All Groups
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
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="groups" element={<GroupPage />} />
                <Route path="create-group" element={<GroupCreate />} />
                <Route path="chats" element={<Chats />} />
                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
