import { useEffect, useState } from 'react'
import './App.css'
import { Card } from './components/pages/Card'
import { Search_user } from './components/pages/Search_user';

function App() {

  //use state cuando ya ingresa el user:
  const [user, setUser] = useState({});


  useEffect(() => {
    setUser({
      name: 'liz'
    })
  }, [])

  return (
    <>
      <div>
      </div>
      <h1>Pin pong game </h1>

      <Card />
      <Search_user />

      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}


      {/* cuando inicie la partida inicia card */}
      {/* <Card player={{ user }} points={5} /> */}
    </>
  )
}

export default App
