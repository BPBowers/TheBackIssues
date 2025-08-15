//Home page.tsx
import Image from "next/image";
import Link from 'next/link';
import ProductCard from "./components/ProductCard";
import HomePageNewComics from "./components/HomePageNewComics";

export default function Home() {
  return (
    <main>
      <div>
        <div className="flex justify-center">
          <HomePageNewComics/>
        </div>
        <div className="flex justify-center">
          {/*Staff Picks*/}
          <HomePageNewComics/>
        </div>
      </div>  
    </main>
  );
}
