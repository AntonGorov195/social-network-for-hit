import axios from "axios";

export default function PostWrite() {

    const submit = (e) => {
        e.preventDefault()
        console.log("Posted");
        const data = {
            // PostId: "", auto generated
            PostAuthor: "", // TODO: use cookie
            PostContent: "",
            // I'm not sure how this will work. Does user have one group?
            // Does the user get to select the group?
            // Does the have do be in the group?
            PostGroup: "",  
            PostLable: "",
            // PostDate: Date, this is optional, will use Date.now() by default.
        }
        axios.post("http://localhost:5000/api/post/create", data)
    }

    return (<div>
        <h1>Write a post</h1>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column" }}>
            <textarea />
            <div>
                <label>Post Label</label>
                <input />
            </div>
            <button> Make Post </button>
        </form>
    </div>)
}