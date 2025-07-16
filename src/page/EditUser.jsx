import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FormInput from "../components/FormInput";

export default function EditUser() {
    /**
     * @typedef {"loading" | "error" | "success"} ResourceState 
     * @typedef {[ResourceState, React.Dispatch<React.SetStateAction<ResourceState>>]} ResourceUseState
    */

    /**  @type {ResourceUseState} */
    const [loadState, setLoadState] = useState("loading");
    const [searchParams] = useSearchParams();
    const groupId = searchParams.get('userId');
    const token = localStorage.getItem('token');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordHidden, setPasswordHidden] = useState(true);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:5000/api/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => {
            setLoadState("success");
            setName(res.data.user.username);
            setEmail(res.data.user.email);
            setPassword(res.data.user.password);
        }).catch((e) => {
            console.error(e);
            setLoadState("error");
        })
    }, [groupId])

    return (<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                        return (
                            <>
                                <h1 style={{
                                    backgroundColor: "var(--color-dark)",
                                    color: "var(--color-light)",
                                    padding: "5px",
                                    margin: "5px",
                                    borderRadius: "20px",
                                }}> Edit User </h1>
                                <form onSubmit={(e) => {
                                    setLoadState("loading");
                                    axios.put("http://localhost:5000/api/users/updateUser", {
                                        username: name,
                                        password: password,
                                        email: email,
                                    }, {
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                        }
                                    }).then((res) => {
                                        setLoadState("success");
                                    }).catch((err) => {
                                        console.error(err);
                                        setLoadState("error");
                                    })
                                }}>
                                    <FormInput type="text" value={name} setValue={setName} inputName="Name" placeholder="username" required="true" />
                                    <FormInput type="email" value={email} setValue={setEmail} inputName="Email" placeholder="email" required="true" />
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "1.4rem",
                                        margin: "5px",
                                        gap: "5px",
                                    }}>
                                        <label style={{
                                            padding: "5px",
                                            borderRadius: "10px",
                                            backgroundColor: "var(--color-dark)",
                                            color: "var(--color-light)",
                                        }}> Passswrd </label>
                                        <input onInput={(e) => {
                                            setPassword(e.target.value);
                                        }} value={password} type={passwordHidden ? "password" : "text"}
                                            style={{
                                                borderStyle: "none",
                                                borderRadius: "10px",
                                                backgroundColor: "var(--color-dark)",
                                                color: "var(--color-light)",
                                            }} />
                                        <input type="button" value="view" onClick={(e) => {
                                            e.preventDefault();
                                            setPasswordHidden(!passwordHidden);
                                        }} className="btn-small" />
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        gap: "5px",
                                        justifyContent: "center",
                                    }}>
                                        <button className="btn-small"> Submit </button>
                                        <button className="btn-small btn-error" onClick={(e) => {
                                            e.preventDefault();
                                            setIsDeleteDialogOpen(true);
                                        }}> Delete User </button>
                                    </div>
                                </form>
                            </>)
                }
                return <div> Invalid State </div>
            })()
        }
        <dialog style={{
            margin: "auto",
            marginTop: "20px",
            backgroundColor: "var(--color-dark)",
            color: "var(--color-light)",
            display: isDeleteDialogOpen ? "block" : "none",
        }}>
            <form style={{
                display: "flex",
                flexDirection: "column",
            }} onSubmit={(e) => {
                e.preventDefault();
                axios.delete("http://localhost:5000/api/users/deleteUser", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }).then((res) => {
                    localStorage.removeItem("token");
                    window.location.href =
                        window.location.protocol + "//" + window.location.host;
                }).catch((err) => {
                    console.error(err);
                })
            }}>
                <h2>Are you sure you want to delete {name}?</h2>
                <div style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    margin: "20px",
                }}>
                    <button className="btn-big" style={{ borderStyle: "solid", borderColor: "var(--color-light)" }}
                        onClick={(e) => {
                            e.preventDefault();
                            setIsDeleteDialogOpen(false);
                        }}
                    >No</button>
                    <button className="btn-big" style={{
                        color: "var(--color-error-light)",
                        backgroundColor: "var(--color-error-dark)",
                        borderStyle: "solid",
                        borderColor: "var(--color-error-light)",
                    }}>Yes</button>
                </div>
            </form>
        </dialog>
    </div>)
}