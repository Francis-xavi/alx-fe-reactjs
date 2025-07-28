import { useState } from 'react'


export default function Counter() {
    const [increase, setCount] = useState(0);

    return (
        <div>
            <p>you clicked {increase} </p>
            <button onClick={() => setCount(increase + 1)}>Increment</button>
            <button onClick={() => setCount(increase - 1)}>Decrement</button>
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    );
}
