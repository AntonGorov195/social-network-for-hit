import {useEffect,useState} from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { jwtDecode } from 'jwt-decode';
import './GroupPage.css';
import {data} from "react-router-dom";
import FormInput from "../components/FormInput";

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
    const [editingGroup, setEditingGroup] = useState(null);
    const [editingName, setEditingName] = useState("");
    const [editingDescription, setEditingDescription] = useState("");
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
    const handleToggleMembership = async (groupId, isMember,userId) => {
        const token = localStorage.getItem("token");
        const action = isMember ? 'deleteUserFromGroup' : 'addUserToGroup'
        const endpoint = `http://localhost:5000/api/groups/${action}`;
        try{
           const res = await axios.put(endpoint,{groupId:groupId,userId:userId},
               {
                   headers: {
                       Authorization: `Bearer ${token}`,
                   }
               });
           await fetchGroups();
           await fetchGroupUsers(groupId)
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
const handleUpdateGroup =async (groupId,newName,newDescription) => {
        const token = localStorage.getItem("token");
        try {
            await axios.put(`http://localhost:5000/api/groups/updateGroup`,{
                groupId,
                name:newName,
                description:newDescription
            },{
                headers: {Authorization: `Bearer ${token}`}
            })
            await fetchGroups();
        }catch(err){
            console.log(err);
        }
}
const handleRemoveUser = async (groupId,userIdToRemove) => {
        const token = localStorage.getItem("token");
        if (!window.confirm("Are you sure you want to delete this user?"))return;
        try {
            await axios.put(`http://localhost:5000/api/groups/deleteUserFromGroup`,{
                groupId:groupId,userId:userIdToRemove
            },
                {headers: {Authorization: `Bearer ${token}`}});
            await fetchGroups();
            await fetchGroupUsers(groupId);
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
                                    onClick={() => handleToggleMembership(group._id, isMember,userId)}
                                    className={`${isMember ? "bg-red-500" : "bg-green-500"} text-white`}>
                                    {isMember ? "Leave" : "Join"}
                                </button>
                                <button onClick={()=>fetchGroupUsers(group._id)}
                                        className = {`bg-blue-500 text-white ml-2`}>
                                    Show Members
                                </button>
                                {isManager && (
                                    <>
                                        <button className="bg-purple-500 text-white ml-2" onClick={() => toggleManagerOption(group._id)}>
                                            manager's action
                                        </button>

                                        {showManagerOptions[group._id] && (
                                            <div>
                                                <button onClick={()=>handleDeleteGroup(group._id)}>delete group</button>
                                                <button onClick={()=>{
                                                setEditingGroup(group);
                                                    setEditingName(group.name);
                                                    setEditingDescription(group.description);
                                                }}>Update group</button>
                                            </div>
                                            )}
                                    </>)}
                                {editingGroup && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                                        <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                                            <h2 className="text-lg font-bold mb-4">Edit Group</h2>
                                            <FormInput type={"text"} inputName={"Group Name"} value={editingName} setValue={setEditingName} required={true} />
                                            <FormInput type={"text"} inputName={"Group Description"} value={editingDescription} setValue={setEditingDescription} required={true} />
                                            <div className="flex justify-between">
                                                <button onClick={()=> setEditingGroup(null)}>Cancel</button>
                                                <button onClick={async ()=>{ await handleUpdateGroup(editingGroup._id,editingName,editingDescription);
                                                setEditingGroup(null);}}>Save Changes</button>
                                            </div>
                                        </div>
                                    </div>
                                            )
                                            }
                                            {userForThisGroup.length > 0 && (
                                                <ul>
                                                    {userForThisGroup.map((user) => (
                                                        <li key={user.id}>
                                                            <span>{user.username}</span>
                                                    {isManager && user._id !== userId && (
                                                        <button className = "bg-red-500"
                                                        onClick={() => handleRemoveUser(group._id,user._id)}>Remove </button> )}
                                                        </li>
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