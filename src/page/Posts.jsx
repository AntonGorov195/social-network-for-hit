import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";

export default function Posts(props) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div>
            {loading ?
                <button>click me </button>
                : <div>
                    {
                        posts.map((p) => {
                            return <Post username={p.PostAuthor} content={p.PostContent} groupName={p.PostGroup} date={p.PostDate} />
                        })
                    }
                </div>
            }
        </div>
    )
}