import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  // Fetch data from Backend
  useEffect(() => {
    axios.get('http://localhost:5000/items')
      .then(res => setItems(res.data));
  }, []);

  const addItem = async () => {
    const res = await axios.post('http://localhost:5000/items', { name: input });
    setItems([...items, res.data]);
    setInput('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task List</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addItem}>Add Task</button>
      <ul>
        {items.map(item => <li key={item._id}>{item.name}</li>)}
      </ul>
    </div>
  );
}

export default App;