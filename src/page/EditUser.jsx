import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function EditUser() {
    /**
     * @typedef {"loading" | "error" | "success"} ResourceState 
     * @typedef {[ResourceState, React.Dispatch<React.SetStateAction<ResourceState>>]} ResourceUseState
    */

    /**  @type {ResourceUseState} */
    const [loadState, setLoadState] = useState("loading");
    const [searchParams] = useSearchParams();
    const groupId = searchParams.get('userId');

    useEffect(() => {
        axios.get("/soon-i-will-add-a-route", {
            
        }).then((res) => {
            
        }).catch((e) => {
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
                            <div> Error </div>
                        )
                    case "success":
                        <div> usr faund </div>
                }
                return <div> Invalid State </div>
            })()
        }
        <form>
            <div>
                <label> Name </label>
                <input value="mane" />
            </div>
            <div>
                <label> iemal </label>
                <input value="mane" />
            </div>
            <div>
                <label> passswrd </label>
                <input value="I need to make some kind of security" />
            </div>
            <button> Submit </button>
        </form>
    </div>)
}