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
      <ProductCard />
    </main>
  );
}
