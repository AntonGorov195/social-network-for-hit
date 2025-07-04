import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../components/Post';
import PostWrite from './PostWrite';



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
        content: content,
        groupName: groupName,
        userSearch: userSearch,
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
    <div>
      <div>
        <h1>Advenced Search</h1>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <label>Content</label>
            <input value={content} onChange={e => setContent(e.target.value)} />
          </div>
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
            return <Post key={p.PostId} username={p.PostAuthor} content={p.PostContent} groupName={p.PostGroup} date={p.PostDate} />
          })}
        </ul>
      </div>
      <PostWrite />
    </div>
  );
}