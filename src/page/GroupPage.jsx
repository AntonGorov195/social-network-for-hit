import {useEffect,useState} from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { jwtDecode } from 'jwt-decode';
import './GroupPage.css';
import {data} from "react-router-dom";

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
    const [groupUsers, setGroupUsers] = useState({});
    const [showManagerOptions, setShowManagerOptions] = useState({});
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
const fetchGroupUsers = async (groupId) => {
        try {
            const respone = await axios.get(`http://localhost:5000/api/groups/getUsersInGroup/${groupId}`)
            setGroupUsers(prev=>({
                ...prev,
                [groupId]: respone.data.group
            }));
        }catch(err){
            console.log(err);
        }
}
const toggleManagerOption = (groupId) => {
        setShowManagerOptions(prev=>({
            ...prev,
            [groupId]: !prev[groupId]
        }));
}
const handleDeleteGroup = async (groupId) => {
        const token = localStorage.getItem("token");
        if(!window.confirm("Are you sure you want to delete this group?"))return;
        try {
            const data = {groupId:groupId};
            await axios.delete(`http://localhost:5000/api/groups/deleteGroup`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data:{groupId}
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
                        const userForThisGroup = groupUsers[group._id] ||[];
                        const isManager = group.managerUser === userId;
                        return (
                            <div key={group._id} className="group-card">
                                <h3>{group.name}</h3>
                                <p>{group.description}</p>
                                <button
                                    onClick={() => handleToggleMembership(group._id, isMember)}
                                    className={`${isMember ? "bg-red-500" : "bg-green-500"} text-white`}>
                                    {isMember ? "Leave" : "Join"}
                                </button>
                                <button onClick={()=>fetchGroupUsers(group._id)}
                                        className = {`bg-blue-500 text-white ml-2`}>
                                    Show Members
                                </button>
                                {isMember && (
                                    <>
                                        <button className="bg-purple-500 text-white ml-2" onClick={() => toggleManagerOption(group._id)}>
                                            manager's action
                                        </button>

                                        {showManagerOptions[group._id] && (
                                            <div>
                                                <button onClick={()=>handleDeleteGroup(group._id)}>delete group</button>
                                                <button>Update group</button>
                                            </div>
                                            )}
                                    </>)}
                                {userForThisGroup.length > 0 && (
                                    <ul>
                                        {userForThisGroup.map((user) => (
                                            <li key={user.id}>{user.username}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        );
                    })}
                    </div>
                </div>) }
                </div>
    )

}