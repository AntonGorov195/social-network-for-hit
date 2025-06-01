import {useEffect, useState} from "react";
import Loading from "../components/Loading";
import Table from "../components/Table";
import axios from "axios";

export default function Posts(props) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = props.userid;

useEffect(()=>{
    const fetchPosts = async () => {
        try {
            const posts = await axios.get('http://localhost:5000/api/posts',{ params:{
                userid: "123"
            }}).then(response => {
                console.log(response.data);
                setPosts(response.data);
                setLoading(false);
            })
                .catch(error => {
                    console.error(error);
                });
        }
        catch (error) {
            console.error(error);
        }
    }
    fetchPosts();
    // TD:add request to DB to get posts...
    //If we were able to get the data change loading to false
},[])

    return (
        <div>
            {loading ?
                <Loading  />
                :<button>click me </button>
                //<Table items={posts} />
            }
        </div>
    )
}