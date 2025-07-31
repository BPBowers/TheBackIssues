//My Collection Page, This will show anylitics and produce an overview of all comics marked as owned
'use client'
import {useState, useRef, useEffect} from 'react'

export default function myCollection(){

    const [count, setCount] = useState(0);
    const countRef = useRef(0);

    const handleCountRef = () => {
        countRef.current++;
    }

    useEffect(() => {
        console.log('The count is: ', count);
        return () => {
            console.log('I am being cleaned up!');
        }
    }, [count]);

    return(
        <div>
            {/* Changing the state will trigger a page rerender every time the value count is altered*/}
            <h1>State Count = {count}</h1>
            <div>
                <button onClick={() => setCount(count + 1)}>Add Count</button>
            </div>
            <div>
                <button onClick={() => setCount(count - 1)}>Sub Count</button>
            </div>
            {/* Ref will not trigger a Rerender! The value will be increased though*/}
            <h1>Ref Count = {countRef.current}</h1>
            <div>
                <button onClick={() => handleCountRef()}>Increase Ref Count</button>
            </div>
        </div>
    );
}