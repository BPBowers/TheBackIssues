//Home page.tsx
import Image from "next/image";
import Link from 'next/link';
import ProductCard from "./components/ProductCard";
import HomePageNewComics from "./components/HomePageNewComics";

export default function Home() {
  return (
    <main>
      <div>
        <div className='p-5 my-5 bg-amber-500 text-white text-xl hover:bg-amber-300 hover:'>
        </div>
        <div className="flex justify-center">
          <HomePageNewComics/>
        </div>
        <div className='p-5 my-5 bg-amber-500 text-white text-xl hover:bg-amber-300 hover:'>
          
        </div>
      </div>  
    </main>
  );
}
