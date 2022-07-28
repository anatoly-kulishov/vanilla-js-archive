import React, {memo, useEffect} from 'react';
import {checkResponseStatus} from "../../../../utils/helpers/responce-helpers";
import ErrorBoundary from "../../../../components/ErrorBoundary";
import LinkBack from "../../../../components/LinkBack";
import Alert from "../../../../components/Alert/Alert";
import EditAccountInfoForm from "./EditAccountInfoForm";

const EditAccountInfo = props => {
    const {isLoading, selectedAccount, getUserById, match, updateUserById, response} = props;
    const accountId = match?.params.id;

    useEffect(() => {
        if (accountId) {
            getUserById(accountId)
        }
    }, [getUserById, accountId])

    return (
        <ErrorBoundary>
            <div className="app-content">
                <div className="container-fluid">
                    {(!isLoading && selectedAccount) && (
                        <>
                            <div className="row">
                                <div className="col-12">
                                    <div>
                                        <LinkBack title='Back to Joblink Users'/>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12">
                                    <div className="d-flex justify-content-between">
                                        <div className="title-box mt-4 mt-md-3">
                                            <h1 className="title error-title mb-0">{selectedAccount?.firstName} {selectedAccount?.lastName}</h1>
                                        </div>
                                        <Alert text={response?.data?.message}
                                               type={checkResponseStatus(response?.status)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <EditAccountInfoForm data={selectedAccount} accountId={accountId}
                                                         onSubmit={updateUserById}/>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </ErrorBoundary>
    );
}

export default memo(EditAccountInfo);
