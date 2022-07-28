import React from 'react';

const EmptyScreen = props => {
    const {title = '...'} = props;
    return (
        <div className="app-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h1 className="title d-block error-title">{title}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmptyScreen;
