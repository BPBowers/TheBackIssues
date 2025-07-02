import Image from "next/image";
import Link from 'next/link';
import ProductCard from "./components/ProductCard";
import MenuBar from "./components/MenuBar";

export default function Home() {
  return (
    <main>
      <MenuBar />
      <h1> 
        Home Page for The Back Issues!
      </h1>
      <h2>
        <Link href="users">To Users Page</Link>
      </h2>
      <div className="flex justify-center">
      <ProductCard/>
      </div>
      
      <h3>
        <Link href="browse">To Browse Page (using this as 3d canvas workshop)</Link>
      </h3>
      <div className='p-5 my-5 bg-amber-500 text-white text-xl hover:bg-amber-300 hover:'>
        This is a tailwind test line
      </div>
      
    </main>
  );
}
