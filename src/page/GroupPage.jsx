import {useEffect,useState} from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { jwtDecode } from 'jwt-decode';
import './GroupPage.css';

function getUserIdFromToken() {
    const token = localStorage.getItem("token");
    if (!token) {
        return null;
    }
    try {
        const decoded = jwtDecode(token);
        return decoded.userId;
    }catch(err) {
        return null;
    }
}


export default function GroupPage(props) {
    const [loading, setLoading] = useState(true);
    const [groups, setGroups] = useState([]);
    const userId = getUserIdFromToken()



        async function fetchGroups() {
            try {
                const respone = await axios.get("http://localhost:5000/api/groups/getAllGroups");
                console.log(respone);
                setGroups(respone.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
    useEffect(() => {
        fetchGroups();
    },[]);
    const handleToggleMembership = async (groupId, isMember) => {
        const token = localStorage.getItem("token");
        const action = isMember ? 'deleteUserFromGroup' : 'addUserToGroup'
        const endpoint = `http://localhost:5000/api/groups/${action}`;
        try{
           const res = await axios.put(endpoint,{groupId:groupId},
               {
                   headers: {
                       Authorization: `Bearer ${token}`,
                   }
               });
           await fetchGroups();
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div>
            {loading ?( <Loading />)
                :(<div className="group-page">
                    <h1>All Groups</h1>
                    <div>
                    {groups.data.map((group) => {
                        const isMember = group.members.includes(userId);
                        return (
                            <div key={group._id} className="group-card">
                                <h3>{group.name}</h3>
                                <p>{group.description}</p>
                                <button
                                    onClick={() => handleToggleMembership(group._id, isMember)}
                                    className={`${isMember ? "bg-red-500" : "bg-green-500"} text-white`}>
                                    {isMember ? "Leave" : "Join"}
                                </button>
                            </div>
                        );
                    })}
                    </div>
                </div>) }
                </div>
    )

}