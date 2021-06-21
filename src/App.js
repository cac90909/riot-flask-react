import React, {useState, useEffect} from 'react';
import './App.css';
import { Game } from './components/Game'
import axios from 'axios'

var req_metrics = {
  
}

var current_req_number = 0
var RIOT_REQ_MAX_ONE_SECOND = 20
var RIOT_REQ_MAX_TWO_MINUTES = 100


function App() {

  console.log("App.js is rendering")

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    axios.get("/TEST").then(response => {
      setData(response.data);
      setLoading(false);
    });
  }, []);

 
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="App">
      <Game game_data={data}/>
    </div>
  );
}

export default App;
