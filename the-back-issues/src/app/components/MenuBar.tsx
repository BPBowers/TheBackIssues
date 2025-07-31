'use client'
import {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function MenuBar() {
   
    const [searchValue, setSearchValue] = useState('')
    const handleSearch = () => {
        console.log("Home Page Input Value: " + searchValue);
    }

    return (
        <div >
            <div>
                {/* Header Bar with Logo, Search bar, Profile, Login/Logout */}
                {/*<Image src={"/../images/logoLight.png"} alt="" width="30" height="30"/>*/}
                <div className="flex justify-end">
                    <Link href='profile'><button className='btn btn-ghost btn-sm'>profile{/* Get Logged In User Name */}</button></Link>
                    <Link href='login'><button className='btn btn-ghost btn-sm'>Login/Logout</button></Link>
                </div>
                <div className="flex justify-end">
                    <input type="text" placeholder="search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="input input-sm input-ghost"/>
                    <button onClick={handleSearch} className="btn btn-ghost btn-sm">enter</button>
                </div>
                <div className="flex space-x-0.5">
                    <Link href='/browse'><button className='btn btn-soft border-blue-600 text-black-600 bg-gradient-to-br to-blue-600 hover:animate-pulse'>Browse</button></Link>
                    <Link href='/mycollection'><button className='btn btn-soft border-fuchsia-600 text-black-600 bg-gradient-to-br to-fuchsia-600 hover:animate-pulse'>My Collection</button></Link>
                    <Link href='/'><button className='btn btn-soft border-green-700 text-black-700 bg-gradient-to-br to-green-700 hover:animate-pulse'>Home</button></Link>
                    <Link href='/about'><button className='btn btn-soft border-amber-500 text-black-500 bg-gradient-to-br to-amber-500 hover:animate-pulse'>About Us</button></Link>
                </div>
            </div>
        </div>
    )
}