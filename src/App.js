import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepository] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {      
      setRepository([...response.data]);
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Título ${Date.now()}`,
      owner: 'Leandro Rocha'
    });
    const repository = response.data;
    setRepository([...repositories, repository]);
  };

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if(response.status !== 204) return;

    const newRepositories = repositories.filter(item => item.id !== id);

    setRepository([...newRepositories]);
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((item, index) => {
                  return (
                  <li key={index}>
                    {item.title}
                    <button onClick={() => handleRemoveRepository(item.id)}>
                      Remover
                    </button>
                  </li>
                )}
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
