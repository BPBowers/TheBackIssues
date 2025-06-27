import React from 'react'
import Link from 'next/link'

interface User {
    id: number;
    name: string;
}

const UsersPage = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', { next: { revalidate: 10 } });
    const users: User[] = await res.json();
    
    return (
        <>
            <h1>Users</h1>
            <p>{new Date().toLocaleTimeString()}</p>
                <ul>
                    {users.map(user => <li key={user.id}>{user.name}</li>)}
                </ul>
        </>
    )
}

export default UsersPage