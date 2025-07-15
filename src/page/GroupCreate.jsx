import {useEffect,useState} from "react";
import axios from "axios";
import FormInput from "../components/FormInput";

export default function GroupCreate(props) {
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit =  async (e) => {
        e.preventDefault();
        const data = {name: name, description: description};
        try {
            const response = await axios.post("http://localhost:5000/api/groups/createGroup", data,
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
            console.log(response.data);
        }catch(err) {
            console.log(err);
        }

    }

    return(
        <div>
            <FormInput type="text" value={name} setValue={setName} inputName={"Group name"} required={true} />
            <FormInput type="text" value={description} setValue={setDescription} inputName={"Group description"}/>
            <button onClick={handleSubmit}>Create Group</button>
        </div>
    )
}