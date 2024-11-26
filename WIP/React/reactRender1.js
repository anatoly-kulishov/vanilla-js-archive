import React, {useEffect, useState} from "react";

/**
 * effect 0
 * cleanup 0
 * effect 1
 * (cleanup 1)
 */
function App() {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        console.log("effect", counter);

        return () => {
            console.log('cleanup', counter);
        }
    }, [counter]);

    useEffect(() => {
        setCounter(prev => prev + 1);
    }, []);

    return null;
}

export default () => <App/>

