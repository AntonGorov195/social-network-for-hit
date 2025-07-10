import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../components/Post';
import PostWrite from './PostWrite';
import FormInput from '../components/FormInput';



export default function Search() {
  /**
   * @typedef {"loading" | "error" | "success"} ResourceState 
   * @typedef {[ResourceState, React.Dispatch<React.SetStateAction<ResourceState>>]} ResourceUseState
  */

  /** @type {ResourceUseState} */
  const [searchState, setSearchState] = useState("loading");
  const [posts, setPosts] = useState([])
  const [content, setContent] = useState("");
  const [groupName, setGroupName] = useState("");
  const [userSearch, setUserSearch] = useState("");

  const fetchPosts = () => {
    setSearchState("loading");
    axios.get('http://localhost:5000/api/posts', {
      params: {
        body: content == "" ? undefined : content,
        groupName: groupName == "" ? undefined : groupName,
        userSearch: userSearch == "" ? undefined : userSearch,
      }
    }).then(response => {
      setSearchState("success");
      setPosts(response.data);
    }).catch(error => {
      setSearchState("error");
      console.error(error);
    });
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ textAlign: "center" }}>Advenced Search</h1>
      <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column" }}>
        <FormInput type={"text"} value={content} setValue={setContent} inputName={"Content"} placeholder={"search text"} />
        <select>
          <option value="post">Post</option>
          <option value="user">User</option>
          <option value="group">Group</option>
        </select>
        <div>
          <label>Group Name</label>
          <input value={groupName} onChange={e => setGroupName(e.target.value)} />
        </div>
        <div>
          <label>Made by User</label>
          <input value={userSearch} onChange={e => setUserSearch(e.target.value)} />
        </div>
        <button onClick={fetchPosts} >Search</button>
      </form>
      <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {posts.map((p) => {
          return <Post key={p._id} username={p.username} content={p.body} groupName={p.groupName} date={p.date} />
        })}
      </ul>
    </div>
  );
}