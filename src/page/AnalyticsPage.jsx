import React, {useEffect} from "react";
import axios from "axios";
import PostsBarChart from "../components/PostBarChart";
import UsersBarChart from "../components/UserBarChart";

export default function AnalyticsPage (){
    const [postsData, setPostsData] = React.useState([]);
    const [usersData, setUsersData] = React.useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            const postsPerGroup = await axios.get('http://localhost:5000/api/analytics/postsPerGroup');
            const usersPerGroup = await axios.get('http://localhost:5000/api/analytics/usersPerGroup');
            setPostsData(postsPerGroup.data);
            setUsersData(usersPerGroup.data);
        };
        fetchData();
    },[]);

    return (
        <div>
           <h2>Posts per group</h2>
            <PostsBarChart data={postsData} />
            <h2>Users per group</h2>
            <UsersBarChart data={usersData} />
        </div>
    )

};