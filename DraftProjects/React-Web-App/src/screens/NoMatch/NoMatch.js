import React from 'react';
import {useLocation} from "react-router-dom";
import LinkBack from "../../components/LinkBack";
import ErrorBoundary from "../../components/ErrorBoundary";

const NoMatch = () => {
    let location = useLocation();

    return (
        <ErrorBoundary>
            <div className="app-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <LinkBack title="Back"/>
                            <h1 className="title error-title mt-3">No match for <i/><code>{location.pathname}</code></h1>
                        </div>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
}

export default NoMatch;
