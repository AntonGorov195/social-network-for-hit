import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Search() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, []);

  const addItem = () => {
    axios.post('http://localhost:5000/api/items', { name: newItem })
      .then(res => setItems([...items, res.data]))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Items</h1>
      <form>
        <input value={newItem} onChange={e => setNewItem(e.target.value)} />
        <button onClick={addItem} onSubmit={(e) => e.preventDefault()}>Search</button>
      </form>
      <ul>
        {items.map((item, i) => <li key={i}>{item.name}</li>)}
      </ul>
    </div>
  );
}