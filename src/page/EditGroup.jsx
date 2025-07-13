import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function EditGroup() {
    /**
     * @typedef {"loading" | "error" | "success"} ResourceState 
     * @typedef {[ResourceState, React.Dispatch<React.SetStateAction<ResourceState>>]} ResourceUseState
    */

    /**  @type {ResourceUseState} */
    const [loadState, setLoadState] = useState("loading");
    const [searchParams] = useSearchParams();
    // const groupId = searchParams.get('groupId');
    const groupId = "6867c3c51fdb19a34948b141";
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [authToken, setAuthToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        axios.get("http://localhost:5000/api/groups/group", {
            params: {
                groupId: groupId,
            }
        }).then((res) => {
            setLoadState("success");
            setGroupName(res.data.name);
            setGroupDescription(res.data.description);
        }).catch((e) => {
            setLoadState("error");
            console.log(e);
        })
    }, [groupId])

    return (<div>
        <h1> Edit Group </h1>
        {
            (() => {
                switch (loadState) {
                    case "loading":
                        return (<div>
                            Loading
                        </div>)
                    case "error":
                        return (
                            <div className="errored-page" style={{

                            }}> Error </div>
                        )
                    case "success":
                        return (
                            <form onSubmit={
                                (e) => {
                                    e.preventDefault()
                                    axios.put("http://localhost:5000/api/groups/updateGroup", {
                                        name: groupName,
                                        groupId: groupId,
                                    }, {
                                        headers: {
                                            Authorization: `Bearer ${authToken}`,
                                        }
                                    })
                                }
                            }>
                                <div>
                                    <label> Name </label>
                                    <input value={groupName} onInput={(e) => {
                                        setGroupName(e.target.value);
                                    }} />
                                </div>
                                <button> Submit </button>
                            </form>)
                }
                return <div> Invalid State </div>
            })()
        }
    </div>)
}