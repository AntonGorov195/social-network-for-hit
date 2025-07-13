import { useEffect, useState } from "react";

export default function GroupPosts() {
    /**
     * @typedef {"loading" | "error" | "success"} ResourceState 
     * @typedef {[ResourceState, React.Dispatch<React.SetStateAction<ResourceState>>]} ResourceUseState
    */

    /**  @type {ResourceUseState} */
    const [loadState, setLoadState] = useState("loading");
    useEffect(() => {
        
    }, [])
    return (<div>

    </div>)
}