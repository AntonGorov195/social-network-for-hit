import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../components/Post';
import PostWrite from './PostWrite';
import FormInput from '../components/FormInput';
import './Search.css'



export default function Search() {
  /**
   * @typedef {"loading" | "error" | "success"} ResourceState 
   * @typedef {[ResourceState, React.Dispatch<React.SetStateAction<ResourceState>>]} ResourceUseState
  */

  /** @type {ResourceUseState} */
      const [selectedType, setSelectedType] = useState('');
      const [query, setQuery] = useState({});
      const [results, setResults] = useState([]);

const handleChange = (e) => {
  setQuery({...query, [e.target.name]: e.target.value});
}

  const handleSearch = async () => {
  try {
    const respons = await axios.post(`http://localhost:5000/api/search/${selectedType}`, query);
    setResults(respons.data);
  }catch(err) {
    console.log(err);
  }
  }

  return (
      <div style={{padding: "30px"}}>
        <h1 style={{textAlign: "center"}}>Advenced Search</h1>
        <select value={selectedType} onChange={(e) => {
          setSelectedType(e.target.value);
          setQuery({});
          setResults([]);
        }}>
          <option value="">Select type</option>
          <option value="post">Post</option>
          <option value="user">User</option>
          <option value="group">Group</option>
        </select>

        {selectedType === "user" && (
            <div>
              <input name="username" type="text" placeholder="Username" onChange={handleChange}/>
              <input name="email" type="email" placeholder="Email" onChange={handleChange}/>
            </div>
        )}

        {selectedType === "post" && (
            <div>
              <input name="body" type="text" placeholder="Body" onChange={handleChange}/>
              <input name="label" type="text" placeholder="Label" onChange={handleChange}/>
            </div>
        )}
        {selectedType === "group" && (
            <div>
              <input name="name" type="text" placeholder="Group" onChange={handleChange}/>
              <input name="description" type="text" placeholder="Description" onChange={handleChange}/>
            </div>
        )}
        <button onClick={handleSearch}>search</button>
          {results.length > 0 && (
              <div className="results">
                  <h2>Results:</h2>
                  <ul>
                      {results.map((item, index) => (
                          <li key={index} className="result-card">
                              {selectedType === "user" && (
                                  <>
                                      <strong>Username:</strong> {item.username}<br />
                                      <strong>Email:</strong> {item.email}
                                  </>
                              )}

                              {selectedType === "post" && (
                                  <>
                                      <strong>Title:</strong> {item.title}<br />
                                      <strong>Body:</strong> {item.body}<br />
                                      <strong>Label:</strong> {item.label}
                                  </>
                              )}

                              {selectedType === "group" && (
                                  <>
                                      <strong>Name:</strong> {item.name}<br />
                                      <strong>Description:</strong> {item.description}
                                  </>
                              )}
                          </li>
                      ))}
                  </ul>
              </div>
          )}

      </div>
  );
}