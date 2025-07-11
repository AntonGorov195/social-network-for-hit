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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        {/* <HomeScreen /> */}
        <BrowserRouter>
            <Routes>
                <Route index element={<HomeScreen />} />
                <Route path="posts" element={<Posts />} />
                <Route path="login" element={<Login />} />
                <Route path="search" element={<Search />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
