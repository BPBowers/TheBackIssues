import Link from 'next/link'

export default function TailMenu() {
    return (
        <div className="bg-base-300 p-10">
                <div className="flex justify-center">
                <div className="p-2 justify-start">
                    <Link href="../about">About</Link>
                </div>
                <div className="p-2">
                    <Link href="../browse">Browse</Link>
                </div>
                <div className="p-2">
                    <Link href="../stats">Site Statistics</Link>
                </div>
                <div className="p-2">
                    <Link href="https://github.com/BPBowers/TheBackIssues">GitHub</Link>
                </div>
                <div className="p-2">
                    <Link href="../contact">Contact</Link>
                </div>
            </div>
            <div className="p-2 flex justify-center text-sm font-thin">
                All comics are trademark and subject to their Publishers and their parent comapnies. The Back Issues claims no ownership over the intellectual property represented on this site.
            </div>
            <div className="flex justify-center p-2">
                    Site Created by Brian Bowers
            </div>
        </div>
    )
}