import React, { useEffect, useState } from 'react';
import './App.css';
import List from './components/List';
import withListLoading from './components/withListLoading';
import axios from 'axios'

function App() {
  const ListLoading = withListLoading(List);
  const [KnopGeklikt, setGeklikt] = useState({clicked:false})
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
  });

  const Klik = () => {
    setGeklikt({clicked: true})
  }
  
  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = "http://localhost:8080/demo/all";
    axios.get(apiUrl).then((repos) => {
      const allRepos = repos.data;
      setAppState({ loading: false, repos: allRepos });
    });
  }, []);



  return (
    <div className='App'>
      <div className='container'>
        <h1>Click here to show all animals</h1>
      </div>

      <div className='button'>
        <button onClick={Klik}>
          Show Animals
        </button>
      </div>

      {KnopGeklikt.clicked && <div className='repo-container'>
        <ListLoading isLoading={appState.loading} repos={appState.repos}/></div>
      }
      
    </div>
  );
}
export default App;
