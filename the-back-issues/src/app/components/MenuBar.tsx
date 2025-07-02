import react from 'react'
import Link from 'next/link'

const MenuBar = () => {
    return (
        <div className="flex space-x-2 pr-px">
            <Link href='/browse'><button className='btn btn-soft btn-primary'>Browse</button></Link>
            <Link href='/mycollection'><button className='btn btn-soft btn-secondary'>My Collection</button></Link>
        </div>
    )
}

export default MenuBar