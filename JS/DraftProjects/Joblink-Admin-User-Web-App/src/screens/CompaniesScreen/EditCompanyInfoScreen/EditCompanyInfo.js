import React, {useEffect} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Alert from "../../../components/Alert";
import LinkBack from "../../../components/LinkBack";
import EditCompanyForm from "./EditCompanyInfoForm";
import {getOneCompany} from "../../../store/actions/accountsActions";

const EditCompanyInfo = props => {
    const {account, alert, updateOneCompany, match, getOneCompany} = props;
    let companyId = match?.params.companyId;
    useEffect(() => getOneCompany(companyId), [getOneCompany, companyId]);

    return (
        <div className="app-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="link-back">
                            <LinkBack title="Back to Company"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="company-details editing-company-info">
                            {account && (
                                <>
                                    <div className="company-details__wrapper">
                                        <div className="row">
                                            <div className="col-12 col-lg-6">
                                                <h1 className="title error-title mt-4 mt-md-3">
                                                    Company editing
                                                </h1>
                                            </div>
                                            <div className="col-12 col-lg-6">
                                                <div
                                                    className="d-flex align-items-center justify-content-md-end mb-3 mb-md-0">
                                                    {alert && <Alert type={alert.color} text={alert.text}/>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <EditCompanyForm initialData={account} onSubmit={updateOneCompany}/>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        alert: state.app.alert,
        selectedAccount: state.accounts.selectedAccount
    }
}

export default connect(mapStateToProps, {getOneCompany})(withRouter(EditCompanyInfo));
