import React, { useContext, useState } from 'react'
import { useForm } from '../../helpers/useForm';
import { methodAjax } from '../../helpers/methodAjax';
import { Global } from '../../helpers/Global';
import { Card } from './Card';

export const Search_user = () => {



    const { form, change } = useForm({});
    const [players, setPlayers] = useState([]);
    const [count, setCount] = useState(0)


    const addPoint = (e, point) => {
        e.preventDefault();
        setCount(point + 1)

    }

    const searchUser = async (e) => {
        e.preventDefault();
        let userName = form.name;
        const { data, charge } = await methodAjax(Global.url_get_all + 'search-user' + `/${userName}`, "GET");
        if (data.status === 'success') {
            setPlayers(players => [...players, data.Users]);
        }
    }
    return (
        <div>
            {players.length < 2 ? <>
                <h1> Welcome! players  </h1>
                <h2>Insert your name:  </h2>
                <input type='text' name='name' placeholder='your name' onChange={change} />
                <button className='add point' onClick={searchUser} >Register</button>

            </> : <>
                <h1>Welcome {players[0].name}  & {players[1].name} </h1>

                {
                    players.map(user => {
                        return (
                            <section>
                                <article className='card' key={user[0].name}>
                                    <h2>Player:  {user[0].name}</h2>
                                    <h3> Points win in this round:</h3>
                                    <p>registers points: <strong> {user[0].point}</strong></p>
                                    <button className='add point' >Add point</button>
                                    {/* <button className='delete' >Editar</button> */}
                                </article>
                            </section>
                        );
                    })
                }

                < Card player={{ playerOne }} />
            </>
            }
        </div>
    )
}
