import { useEffect, useState } from 'react'
import './App.css'
import { Card } from './components/pages/Card'
import { Search_user } from './components/pages/Search_user';
import { methodAjax } from './helpers/methodAjax'; // Importa methodAjax
import { Global } from './helpers/Global'; // Importa Global

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [players, setPlayers] = useState([]);
  const [winner, setWinner] = useState({})

  const getAllUsers = async () => {
    const { data, charge } = await methodAjax(Global.url_get_all + "all", "GET");
    if (data.status === 'success') {
      setUsers(data.users);
      setLoading(charge)
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])
  return (

    <>
      <h1>Pin pong game </h1>
      {players.length < 2 ? <Card users={users} loading={loading} /> : <> </>}
      {winner && winner.name ?
        <>
          <h2 style={{ color: 'red' }}>The winner is: <strong>{winner.name} </strong> </h2>
          <hr></hr>
          <button className='add point' onClick={() => window.location.reload()}>New match</button>
        </>
        :
        <Search_user users={users} players={players} setPlayers={setPlayers} setWinner={setWinner} winner={winner} />
      }

    </>
  )
}

export default App
