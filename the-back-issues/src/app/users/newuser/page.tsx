'use client'
import React, { useState } from 'react'

const NewUser = () => {
    const [status, setStatus] = useState('idle')
    
    const createUser = async () => {
        const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: 'testUserZZZ',
            password: 'testUserPassword',
            }),
        })
    
        if (res.ok) {
            setStatus('sucess')
        } else {
            setStatus('error')
        }
    }

    return (
        <div>
            <h1>
                This is the new user page
            </h1>
            <button className="btn btn-primary" onClick={createUser}>
                Create User
            </button>
        </div>
    )
}

export default NewUser