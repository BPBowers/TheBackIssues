'use client'
import {useState} from 'react'
import Link from 'next/link'

export default function MenuBar() {
   
    const [searchValue, setSearchValue] = useState('')
    const imgSrc = "file:///./backIssuesLogoDarkMode.png"
    const handleSearch = () => {
        console.log("Home Page Input Value: " + searchValue);
    }

    return (
        <div >
            <div>
                {/* Header Bar with Logo, Search bar, Profile, Login/Logout */}
                <img src={imgSrc}/>
                <div className="flex justify-end">
                    <Link href='profile'><button className='btn btn-ghost btn-sm'>profile{/* Get Logged In User Name */}</button></Link>
                    <Link href='signin'><button className='btn btn-ghost btn-sm'>Login/Logout</button></Link>
                </div>
                <div className="flex justify-end">
                    <input type="text" placeholder="search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="input input-sm input-ghost"/>
                    <button onClick={handleSearch} className="btn btn-ghost btn-sm">enter</button>
                </div>
                <div>
                <Link href='/browse'><button className='btn btn-soft btn-primary'>Browse</button></Link>
                <Link href='/mycollection'><button className='btn btn-soft btn-secondary'>My Collection</button></Link>
                </div>
            </div>
        </div>
    )
}