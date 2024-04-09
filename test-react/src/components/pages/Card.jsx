import React from 'react';

export const Card = ({ users, loading }) => {
    return (
        <section>
            <h2>Users point ranking</h2>
            {loading ? <h3>Cargando</h3> :
                <table className='table' >
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.point}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            }
        </section>
    )
}
