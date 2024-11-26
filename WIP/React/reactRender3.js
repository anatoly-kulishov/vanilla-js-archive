import React, { useState } from 'react';

/**
 * App 0
 * click()
 * App 0
 * click()
 * App 0
 */
function App() {
    const [state, setState] = useState(0);
    console.log("App " + state);
    return (
        <div>
            <button onClick={() => {
                setState(state + 1);
                setState(state * 2);
            }}>click me</button>
        </div>
    );
}

export default () => <App />