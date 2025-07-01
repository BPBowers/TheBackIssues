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
      <h3>
        <Link href="browse">To Browse Page (using this as 3d canvas workshop)</Link>
      </h3>
    </main>
  );
}
