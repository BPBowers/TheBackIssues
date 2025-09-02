import TradeBoard from "../components/TradeBoard"
import Link from 'next/link'
export default function tradePage() {
    return (
        <div>
            <TradeBoard/>
            <Link href="./trade/newpost"><button className="bg-amber-400 hover:bg-amber-600">Create a new Trade Post</button></Link>
        </div>
    )
}