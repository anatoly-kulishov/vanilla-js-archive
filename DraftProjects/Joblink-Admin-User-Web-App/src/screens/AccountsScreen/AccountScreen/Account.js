import React, {memo, useEffect, useState} from 'react';
import ErrorBoundary from "../../../components/ErrorBoundary";
import LinkBack from "../../../components/LinkBack";
import {NavLink} from "react-router-dom";

const Account = props => {
    const {selectedAccount, isLoading, getUserById, match} = props;
    const [messageGroups, setMessageGroups] = useState([1, 2, 3, 4, 5]);
    const accountId = match?.params.id;

    useEffect(() => {
        getUserById(accountId)
    }, [getUserById, accountId])

    const removeGroup = (id) => {
        console.log(`removeSkill(${id})`);
        const idx = messageGroups.findIndex((el) => el === id);
        const newArray = [
            ...messageGroups.slice(0, idx), ...messageGroups.slice(idx + 1)
        ];
        setMessageGroups(newArray)
    }

    return (
        <ErrorBoundary>
            <div className="app-content">
                <div className="container-fluid">
                    {(!isLoading && selectedAccount) && (
                        <>
                            <div className="row mb-3">
                                <div className="col-12">
                                    <div>
                                        <LinkBack title='Back to Joblink'/>
                                    </div>
                                    <div className="title-box mt-4 mt-md-3">
                                        <h1 className="title error-title mb-0">{selectedAccount.firstName} {selectedAccount.lastName}</h1>
                                        <span
                                            className="title-badge mt-3 mt-md-0 ml-3">Joblink {selectedAccount.class}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="white-shadow-box pb-3 mb-1">
                                        <div className="info-cols">
                                            <div className="info-col">
                                                <span className="info-col__label">Email</span>
                                                <strong className="info-col__title">{selectedAccount.email}</strong>
                                            </div>
                                            <div className="info-col">
                                                <span className="info-col__label">Phone</span>
                                                <strong className="info-col__title">{selectedAccount.phone}</strong>
                                            </div>

                                            <div className="info-col align-items-start">
                                                    <span
                                                        className="info-col__label mb-1">Password</span>
                                                <button className="btn btn--light-green"
                                                        onClick={() => console.log("onSendPasswordReset()")}>
                                                    Send password reset link
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-4 mt-md-2">
                                            <NavLink to={`/accounts-joblink/${accountId}/edit-company-info`}
                                                     className="btn btn--smd-block btn--light-green">
                                                Edit personal info
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="white-shadow-box mb-1">
                                        <div className="info-cols">
                                            <div className="info-col">
                                                <div className="info-col__label">Message groups</div>
                                                <div className="required-skills mt-2">
                                                    {messageGroups.map(el => (
                                                        <div key={el} className="skill-box">Group name {el}
                                                            <span className="delete-skill icon"
                                                                  onClick={() => removeGroup(el)}/>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mt-2">
                                                    <button className="btn btn--light-green btn--disabled"
                                                            onClick={() => console.log("editMessagesGroups()")}>Edit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </ErrorBoundary>
    );
}

export default memo(Account);
