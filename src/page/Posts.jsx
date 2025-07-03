import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";
import SearchIcon from "../components/SearchIcon";
import AdvanceSearchButton from "../components/AdvanceSearchButton";
import PostsSearchBar from "../components/PostsSearchBar";

export default function Posts(props) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState("");
    const [advancedSearchOn, setAdvancedSearchOn] = useState(false);
    const [advancedSearchGroup, setAdvancedSearchGroup] = useState("");

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
        <div style={{ display: "flex", justifyContent: "center" }}>
            {loading ?
                <div> Loading </div>
                : <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", width: "66%" }}>
                    <div style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
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
                        <PostsSearchBar onInput={(e) => setSearchInput(e.currentTarget.value)} />
                        <SearchIcon />
                        <AdvanceSearchButton onClick={(e) => setAdvancedSearchOn(!advancedSearchOn)} />
                    </div>
                    {
                        advancedSearchOn &&
                        <div style={{
                            backgroundColor: "var(--color-dark)",
                            color: "var(--color-light)",
                            width: "100%",
                            fontSize: "1.5rem",
                            padding: "10px",
                            borderRadius: "20px",
                        }}>
                            <div style={{
                                display: "flex",
                                gap: "3px",
                            }}>
                                <div> Group search</div>
                                <input style={{
                                    color: "var(--color-light)",
                                    backgroundColor: "var(--color-dark)",
                                    fontSize: "1.5rem",
                                    flex: "1",
                                }} />
                            </div>
                            <div>
                                User Search
                            </div>
                            <div>
                                Another Filter
                            </div>
                        </div>
                    }
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