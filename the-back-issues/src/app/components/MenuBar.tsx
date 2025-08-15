"use client";
import {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn, signOut} from "next-auth/react";
import { usePathname } from "next/navigation";

const ACTIVE = "btn btn-ghost btn-sm shadow-md underline decoration-blue-500 underline-offset-4";
const UNACTIVE =
  "btn btn-ghost btn-sm hover:shadow-md hover:underline hover:decoration-blue-500 hover:underline-offset-4";

function LoginButton() {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (session) {
    return (
      <>
        <div className="flex gap-7">
          <button className={pathname === "/profile" ? ACTIVE : UNACTIVE}>
            <Link href="/profile">{session?.user?.name}</Link>
          </button>
          <button className={UNACTIVE} onClick={() => signOut()}>
            Sign out
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <button
        className={pathname != "/" ? ACTIVE : UNACTIVE}
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
}

export default function MenuBar() {
   
    const [searchValue, setSearchValue] = useState('')
    const handleSearch = () => {
        console.log("Home Page Input Value: " + searchValue);
    }

    return (
        <div className="bg-base-100">
            <div className="px-5">
                {/* Header Bar with Logo, Search bar, Profile, Login/Logout */}
                {/**/}
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href='/'><Image src={"/logoDark.png"} alt="Site Logo" width="40" height="40" className="hover:animate-pulse"/></Link>
                        The BackIssues
                    </div>
                    <div className="flex justify-end">
                        <Link href='profile'><button className='btn btn-ghost btn-sm'>profile{/* Get Logged In User Name */}</button></Link>
                        <LoginButton/>
                        <div className="flex justify-end">
                          <input type="text" placeholder="search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="input input-sm input-ghost"/>
                          <button onClick={handleSearch} className="btn btn-ghost btn-sm">enter</button>
                        </div>
                    </div>
                    
                    {/*<Link href='login'><button className='btn btn-ghost btn-sm'>Login/Logout</button></Link>*/}
                </div>
                
                <div className="flex justify-end">
                    
                </div>
                <div className="flex justify-center sm:space-x-3 md:space-x-10">
                    <Link href='/browse'><button className='btn btn-circle border-amber-500 text-black-600 bg-gradient-to-br to-amber-500 hover:to-amber-300 hover:scale-110 ease-in-out transition-all duration-300 w-31'>Browse</button></Link>
                    <Link href='/buy'><button className='btn btn-soft border-amber-500 text-black-700 bg-gradient-to-br to-amber-500 hover:to-amber-300 hover:scale-110 ease-in-out transition-all duration-300 w-31'>Buy</button></Link>
                    <Link href='/mycollection'><button className='btn btn-soft border-amber-500 text-black-600 bg-gradient-to-br to-amber-500 hover:to-amber-300 hover:scale-110 ease-in-out transition-all duration-300 w-31'>My Collection</button></Link>
                    <Link href='/about'><button className='btn btn-circle border-amber-500 text-black-500 bg-gradient-to-br to-amber-500 hover:to-amber-300 hover:scale-110 ease-in-out transition-all duration-300 w-31'>About Us</button></Link>
                </div>
            </div>
        </div>
    )
}