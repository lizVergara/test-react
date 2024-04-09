import React, { useEffect, useState } from 'react'
import { methodAjax } from '../../helpers/methodAjax';
import { Global } from '../../helpers/Global';

export const Card = () => {

    const [users, setUsers] = useState([])
    const getAllUsers = async (e) => {
        const { data, charge } = await methodAjax(Global.url_get_all + "all", "GET");
        if (data.status === 'success') {
            data.map((element) => {

                console.log(element)

            });
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [])
    return (
        <section>
            <h1>Users point ranking</h1>
            <h2></h2>
        </section >
    )
}
