import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";
import PostsSearchBar from "../components/PostsSearchBar";
import styles from "./Posts.module.css"


export default function Posts(props) {
    /**
     * @typedef {"loading" | "error" | "success"} ResourceState 
     * @typedef {[ResourceState, React.Dispatch<React.SetStateAction<ResourceState>>]} ResourceUseState
    */

    /**  @type {ResourceUseState} */
    const [searchState, setSearchState] = useState("loading");
    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [authToken, setAuthToken] = useState(localStorage.getItem("token"));

    const fetchPosts = () => {
        setSearchState("loading");
        axios.get('http://localhost:5000/api/posts', {
            params: {
                token: authToken,
                body: searchInput,
            },
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        }).then(response => {
            setSearchState("success");
            setUserId(response.data.userId);
            console.log(response.data.posts)
            setPosts(response.data.posts);
        }).catch(error => {
            setSearchState("error");
            console.error(error);
        });
    }

    useEffect(() => {
        fetchPosts();
    }, [searchInput])

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div style={{ display: "flex", gap: "10px" }}>
                    <PostsSearchBar onInput={(e) => setSearchInput(e.currentTarget.value)} />
                    {/* <SearchIcon /> */}
                    {/* <AdvanceSearchButton onClick={(e) => setAdvancedSearchOn(!advancedSearchOn)} /> */}
                </div>
                <div style={{ display: "flex", gap: "10px", textAlign: "center" }}>
                    <div style={{ flex: "1", backgroundColor: "var(--color-dark)", color: "var(--color-light)", padding: "15px", borderRadius: "10px" }}>Results: {posts.length}</div>
                    <a style={{ flex: "1", backgroundColor: "var(--color-dark)", color: "var(--color-light)", padding: "15px", borderRadius: "10px" }} href="/post-write">Write Post</a>
                    <a style={{ flex: "1", backgroundColor: "var(--color-dark)", color: "var(--color-light)", padding: "15px", borderRadius: "10px" }} href="/search">Advance Search</a>
                </div>
                <ul className={styles["posts-list"]}>
                    {
                        (() => {
                            switch (searchState) {
                                case "loading":
                                    return (<div className={styles["loading-msg"]}>Loading</div>)
                                case "success":
                                    if (posts.length == 0) {
                                        return (<div >
                                            No posts found
                                        </div>)
                                    }
                                    // TODO: Use ul tag for the posts list 
                                    return (
                                        posts.map((p) => {
                                            return <Post postId={p._id} key={p._id} canEdit={p.userId === userId} username={p.username} content={p.body} groupName={p.groupName} date={p.date} videoUrl={p.videoUrl} canvasUrl={p.canvasUrl} />
                                        })
                                    )
                                case "error":
                                    return (<div className={styles["error-msg"]}>Error</div>)
                            }
                            return (<div>Invalid State</div>)
                        })()
                    }
                </ul>
            </main>
        </div>
    )
}