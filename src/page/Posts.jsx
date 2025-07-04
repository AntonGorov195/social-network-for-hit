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

    const [posts, setPosts] = useState([]);
    /**  @type {ResourceUseState} */
    const [searchState, setSearchState] = useState("loading");
    const [searchInput, setSearchInput] = useState("");
    const [advancedSearchOn, setAdvancedSearchOn] = useState(false);
    const [advancedSearchGroup, setAdvancedSearchGroup] = useState("");

    const fetchPosts = () => {
        setSearchState("loading");
        axios.get('http://localhost:5000/api/posts', {
            params: {
                userid: searchInput,
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
    }, [])

    useEffect(() => {
        fetchPosts();
    }, [searchInput, advancedSearchGroup])

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div style={{ display: "flex", gap: "10px" }}>
                    <PostsSearchBar onInput={(e) => setSearchInput(e.currentTarget.value)} />
                    {/* <SearchIcon /> */}
                    {/* <AdvanceSearchButton onClick={(e) => setAdvancedSearchOn(!advancedSearchOn)} /> */}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>Results: {posts.length}</div>
                    <a href="/404">Write Post</a>
                    <a href="/search">Advance Search</a>
                </div>
                {/* <div>
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
                                    }} onInput={(e) => {
                                        setAdvancedSearchGroup(e.currentTarget.value)
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
                    </div> */}
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
                                            return <Post key={p.PostId} username={p.PostAuthor} content={p.PostContent} groupName={p.PostGroup} date={p.PostDate} />
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