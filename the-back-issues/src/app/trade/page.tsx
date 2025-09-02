import TradeBoard from "../components/TradeBoard"
import Link from 'next/link'
export default function tradePage() {
    return (
        <div>
            <div className="flex justify-center">
                <Link href="./trade/newpost">
                    <button className="bg-amber-400 border-amber-950 border-2 hover:bg-amber-600">
                        Create a new Trade Post
                    </button>
                </Link>
            </div>
            <TradeBoard/>
        </div>
    )
}