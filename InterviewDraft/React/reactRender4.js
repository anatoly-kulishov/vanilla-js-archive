import { useState, useEffect, useLayoutEffect } from "react";

/**
 * App
 * useLayoutEffect
 * setState()
 * useEffect 1
 * useEffect 2
 * App
 * useLayoutEffect cleanup
 * useLayoutEffect
 * useEffect 1 cleanup
 * useEffect 2 cleanup
 * useEffect 1
 * useEffect 2
 */

function App() {
    console.log("App");
    const [state, setState] = useState(0);

    useEffect(() => {
        setState((state) => state + 1);
        console.log("setState()");
    }, []);

    useEffect(() => {
        console.log("useEffect 1");
        return () => {
            console.log("useEffect 1 cleanup");
        };
    }, [state]);

    useEffect(() => {
        console.log("useEffect 2");
        return () => {
            console.log("useEffect 2 cleanup");
        };
    }, [state]);

    useLayoutEffect(() => {
        console.log("useLayoutEffect");
        return () => {
            console.log("useLayoutEffect cleanup");
        };
    }, [state]);

    return null;
}

export default () => <App />