import React, {useState} from 'react';
import './ThrowError.scss';

const ThrowError = () => {
    const [error, setError] = useState();

    const setRenderError = () => {
        setError(new Error('An Uncaught Error'));
    };

    if (error) {
        throw error;
    }

    return (
        <button
            className="error-button btn btn-danger btn-lg" onClick={() => setRenderError()}>
            Throw Error
        </button>
    );
}

export default ThrowError;