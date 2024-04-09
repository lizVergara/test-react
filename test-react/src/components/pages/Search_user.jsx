import React, { useContext, useEffect, useState } from 'react'
import { methodAjax } from '../../helpers/methodAjax';
import { Global } from '../../helpers/Global';

export const Search_user = ({ users, players, setPlayers, setWinner, winner }) => {
    const [points, setPoints] = useState([0, 0]); // Estado para los puntos de cada jugador
    const [roundPoint, setRoundPoint] = useState(0)
    const [server, setServer] = useState("")
    const [indice, setIndice] = useState(0)

    useEffect(() => {
        if (players.length == 2) {
            setServer(players[indice].name)
        }
    }, [players])


    useEffect(() => {
        if (players.length == 2) {
            condition()
        }

    }, [points])

    const searchName = async (e) => {
        e.preventDefault();
        let name_to_find = e.target.name.value
        e.target.name.value = '';
        let user_find = (users.filter(element => element.name.includes(name_to_find))[0])
        if (user_find) {
            setPlayers(players => [...players, user_find])
        } else {
            await getAllUsers(name_to_find)
        }
    }

    const getAllUsers = async (name) => {
        let dataSave = {
            name: name,
            point: 0
        }
        const { data, charge } = await methodAjax(Global.url_get_all + "create", "POST", dataSave);
        if (data.status === 'success') {
            setPlayers(players => [...players, data.user])
        }
    }

    const updateUser = async (user) => {
        const { data, charge } = await methodAjax(Global.url_get_all + "update-user", "POST", user);
        if (data.status === 'success') {
            setWinner(user)
            console.log("exitoso")
        }
    }

    const addPoint = (index) => {
        const actualPoint = roundPoint + 1
        setRoundPoint(actualPoint)
        setPoints(prevPoints => {
            const newPoints = [...prevPoints];
            newPoints[index] += 1;
            return newPoints;
        });
        let indiceActual = indice
        if (actualPoint % 2 == 0) {
            indiceActual = indiceActual + 1
            setIndice(indiceActual)
        }
        setServer(players[indiceActual % 2].name)
    }


    const condition = async () => {
        if (points[0] > 10 && (points[0] - points[1]) >= 2) {
            players[0].point = players[0].point + points[0];
            await updateUser(players[0]);

        } else if (points[1] > 10 && (points[1] - points[0]) >= 2) {
            players[1].point = players[1].point + points[1];
            await updateUser(players[1]);
        }
    }


    return (
        <div>
            {players.length < 2 ? <>
                <h1> Welcome! players  </h1>
                <h2>Insert your name:  </h2>
                <form onSubmit={e => searchName(e, e.target.name.value)} >
                    <input type='text' name='name' placeholder='your name' />
                    <button className='add point' >Register</button>
                </form>
            </> : <>
                <h1>Welcome  </h1>
                <h2>The actual server is: <strong>{server} </strong> </h2>
                {
                    players.map((user, index) => {
                        return (
                            <section key={user._id}>
                                <article className='card'>
                                    <h2>Player:  {user.name}</h2>
                                    <h3> Points win in this round: {points[index]}</h3> {/* Mostrar puntos */}
                                    <p>registers points: <strong> {user.point}</strong></p>
                                    <button className='add point' onClick={() => addPoint(index)}>Add point</button>
                                </article>
                            </section>
                        );
                    })
                }
            </>}
        </div>
    )
}
