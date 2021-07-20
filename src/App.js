import React, {useState, useEffect} from 'react';
import './App.css';
import { Game } from './components/Game'
import axios from 'axios'


var req_metrics = {
  current_req_number : 0,
  RIOT_REQ_MAX_ONE_SECOND : 20,
  RIOT_REQ_MAX_TWO_MINUTES : 100
}




function App() {

  console.log("App.js is rendering")

  const [game_data, setGameData] = useState();
  const [game_loading, setGameLoading] = useState(true);
  const game_url = '/TEST'
  useEffect(() => axios.get(game_url).then(response => setGameData(response.data)).then(() => setGameLoading(false)),[])

  const [champ_data, setChampData] = useState()
  const [champ_loading, setChampLoading] = useState(true)
  const champ_url = 'http://ddragon.leagueoflegends.com/cdn/11.13.1/data/en_US/champion.json'
  useEffect(() => axios.get(champ_url).then(response => setChampData(response.data.data)).then(() => setChampLoading(false)), [])

  const [item_data, setItemData] = useState()
  const [item_loading, setItemLoading] = useState(true)
  const item_url = 'http://ddragon.leagueoflegends.com/cdn/11.14.1/data/en_US/item.json'
  useEffect(() => axios.get(item_url).then(response => setItemData(response.data.data)).then(() => setItemLoading(false)), [])

  const [ss_data, setSSData] = useState()
  const [ss_loading, setSSLoading] = useState(true)
  const ss_url = 'http://ddragon.leagueoflegends.com/cdn/11.14.1/data/en_US/summoner.json'
  useEffect(() => axios.get(ss_url).then(response => setSSData(response.data.data)).then(() => setSSLoading(false)), [])

  

  if (game_loading || champ_loading || item_loading || ss_loading) {
    return <div className="App">Loading...</div>;
  }

  console.log("game_data in App.js (where axios retrieves it):", game_data)
  console.log("champ_data in App.js (where axios retrieves it):", champ_data)
  console.log("item_data in App.js (where axios retrieves it):", item_data)
  console.log("ss_data in App.js (where axios retrieves it):", ss_data)
  console.log("")

  return (
    <div className="App">
      <p>Game: {game_data.Summary.Game.gameId}</p>
      <Game game_data={game_data} champ_data={champ_data} item_data={item_data} ss_data={ss_data}/>
    </div>
  );
}

export default App;
