import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";

export default function Posts(props) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await axios.get('http://localhost:5000/api/posts', {
                    params: {
                        userid: "123",

                    }
                }).then(response => {
                    setLoading(false);
                    setPosts(response.data);
                    console.log(response.data);
                }).catch(error => {
                    console.error(error);
                });
                console.log(posts);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchPosts();
    }, [])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await axios.get('http://localhost:5000/api/posts', {
                    params: {
                        userid: "123",
                    }
                }).then(response => {
                    setLoading(false);
                    if (searchInput != "") {
                        setPosts(response.data.filter((p) => {
                            return p.PostContent.includes(searchInput)
                        }));
                    } else {
                        setPosts(response.data);
                    }
                }).catch(error => {
                    console.error(error);
                });
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchPosts();
    }, [searchInput])

    return (
        <div>
            {loading ?
                <div> Loading </div>
                : <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                    <div style={{
                        width: "66%",
                        display: "flex",
                        gap: "3px",
                        fontSize: "2rem",
                        color: "var(--color-light)",
                    }}>
                        {/* <img src="https://img.icons8.com/metro/26/search.png" style={{
                            padding: "10px",
                            backgroundColor: "var(--color-dark)",
                            borderRadius: "20px",
                            fontSize: "2rem",
                            color: "",

                        }} /> */}
                        <input style={{
                            padding: "10px",
                            backgroundColor: "var(--color-dark)",
                            color: "var(--color-light)",
                            borderWidth: "10px",
                            borderStyle: "none",
                            borderRadius: "20px",
                            fontSize: "2rem",
                            flex: "1",
                        }} placeholder="Search Here" onInput={(e) => {
                            setSearchInput(e.currentTarget.value);
                        }} />
                        <svg style={{
                            backgroundColor: "var(--color-dark)",
                            padding: "10px",
                            borderRadius: "20px",
                        }} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 26 26">
                            <path fill="var(--color-light)" d="M 10 0.1875 C 4.578125 0.1875 0.1875 4.578125 0.1875 10 C 0.1875 15.421875 4.578125 19.8125 10 19.8125 C 12.289063 19.8125 14.394531 19.003906 16.0625 17.6875 L 16.9375 18.5625 C 16.570313 19.253906 16.699219 20.136719 17.28125 20.71875 L 21.875 25.34375 C 22.589844 26.058594 23.753906 26.058594 24.46875 25.34375 L 25.34375 24.46875 C 26.058594 23.753906 26.058594 22.589844 25.34375 21.875 L 20.71875 17.28125 C 20.132813 16.695313 19.253906 16.59375 18.5625 16.96875 L 17.6875 16.09375 C 19.011719 14.421875 19.8125 12.300781 19.8125 10 C 19.8125 4.578125 15.421875 0.1875 10 0.1875 Z M 10 2 C 14.417969 2 18 5.582031 18 10 C 18 14.417969 14.417969 18 10 18 C 5.582031 18 2 14.417969 2 10 C 2 5.582031 5.582031 2 10 2 Z M 4.9375 7.46875 C 4.421875 8.304688 4.125 9.289063 4.125 10.34375 C 4.125 13.371094 6.566406 15.8125 9.59375 15.8125 C 10.761719 15.8125 11.859375 15.433594 12.75 14.8125 C 12.511719 14.839844 12.246094 14.84375 12 14.84375 C 8.085938 14.84375 4.9375 11.695313 4.9375 7.78125 C 4.9375 7.675781 4.933594 7.574219 4.9375 7.46875 Z"></path>
                        </svg>
                    </div>
                    {
                        posts.map((p) => {
                            return <Post key={p.PostId} username={p.PostAuthor} content={p.PostContent} groupName={p.PostGroup} date={p.PostDate} />
                        })
                    }
                </div>
            }
        </div>
    )
}