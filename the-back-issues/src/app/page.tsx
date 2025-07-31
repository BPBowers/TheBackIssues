//Home page.tsx
import Image from "next/image";
import Link from 'next/link';
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <main>
      <h1> 
        Home Page for The Back Issues!
      </h1>
      <h2>
        <Link href="users">To Users Page</Link>
      </h2>
      <div className='p-5 my-5 bg-amber-500 text-white text-xl hover:bg-amber-300 hover:'>
        This is a tailwind test line
      </div>
      
    </main>
  );
}
