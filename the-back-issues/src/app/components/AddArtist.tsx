'use client'
import { useState } from 'react';

export default function AddArtist() {
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [profilePic, setProfilePic] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
            await fetch('/api/artists/new', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({firstName, middleName, lastName, profilePic}),
            })
            setFirstName('')
            setMiddleName('')
            setLastName('')
            setProfilePic('')
            alert('Artist Successfully added!')
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add new Artist to Database!</h2>
            <input type="text" placeholder="First Name" value={firstName} onChange={e=>setFirstName(e.target.value)}
            required/>
            <input type="text" placeholder="Middle Name" value={middleName} onChange={e=>setMiddleName(e.target.value)}/>
            <input type="text" placeholder="Last Name" value={lastName} onChange={e=>setLastName(e.target.value)}
            required/>
            <input type="text" placeholder="Profile Pic Link" value={profilePic} onChange={e=>setProfilePic(e.target.value)}/>
            <button type="submit">Add Artist</button>
        </form>
    )
}