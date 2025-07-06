import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";
import SearchIcon from "../components/SearchIcon";
import AdvanceSearchButton from "../components/AdvanceSearchButton";
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
    const [searchInput, setSearchInput] = useState("");

    const fetchPosts = () => {
        setSearchState("loading");
        axios.get('http://localhost:5000/api/posts', {
            params: {
                content: searchInput,
            }
        }).then(response => {
            setSearchState("success");
            setPosts(response.data);
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
                <div className={styles["posts-list"]}>
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
                                            return <Post key={p._id} username={p.username} content={p.body} groupName={p.groupName} date={p.date} />
                                        })
                                    )
                                case "error":
                                    return (<div className={styles["error-msg"]}>Error</div>)
                            }
                            return (<div>Invalid State</div>)
                        })()
                    }
                </div>
            </main>
        </div>
    )
}