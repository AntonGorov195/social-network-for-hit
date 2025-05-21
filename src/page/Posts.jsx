import {useEffect, useState} from "react";
import Loading from "../components/Loading";
import Table from "../components/Table";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

useEffect(()=>{
    // TD:add request to DB to get posts...
    //If we were able to get the data change loading to false
},[])

    return (
        <div>
            {loading ?
                <Loading  />
                : <Table items={posts} />
            }
        </div>
    )
}