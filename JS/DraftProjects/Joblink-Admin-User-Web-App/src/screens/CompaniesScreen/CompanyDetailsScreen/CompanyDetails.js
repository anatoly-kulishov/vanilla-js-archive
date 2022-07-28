import React, {memo, useEffect, useState} from 'react';
import {NavLink, useRouteMatch} from "react-router-dom";
import ErrorBoundary from "../../../components/ErrorBoundary";
import LocationsLegend from "../../../components/LocationsLegend";
import CompanyUsersLegend from "../../../components/CompanyUsersLegend";

const CompanyDetails = props => {
    const {account, getOneCompany, costCenters, match, history} = props;

    // Other Hooks
    const {url} = useRouteMatch();

    // States
    const [companyId] = useState(match?.params?.companyId);

    useEffect(() => getOneCompany(companyId), [getOneCompany, companyId]);

    return (
        <div className="app-content">
            <ErrorBoundary>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="link-back">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                                    <g stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round"
                                       strokeLinejoin="round">
                                        <path d="M6 11.996h12"/>
                                        <path d="M12 18l-6-6 6-6"/>
                                    </g>
                                    <defs/>
                                </svg>
                                <div onClick={history.goBack} className="link-back__title">
                                    Back to Companies
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="company-details">
                                {account && (
                                    <div className="company-details__wrapper">
                                        <h1 className="title error-title mt-4 mt-md-3">{account.name}</h1>
                                        <div className="company-details__info white-shadow-box">
                                            <div className="row">
                                                <div className="col-12 col-md-6">
                                                    <dl>
                                                        <dt>Business ID</dt>
                                                        <dd>{account.businessId}</dd>
                                                    </dl>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <dl>
                                                        <dt>Invoicing address</dt>
                                                        <dd>
                                                            <span>{account.invoicingAddress_Street},</span>
                                                            <span>{account.invoicingAddress_ZipCode},</span>
                                                            <span>{account.invoicingAddress_City}</span>
                                                        </dd>
                                                    </dl>
                                                </div>
                                                <div className="col-12">
                                                    <dl>
                                                        <dt>E-Invoicing address</dt>
                                                        <dd>
                                                            <span>{account.eInvoicingAddress_OperatorName},</span>
                                                            <span>{account.eInvoicingAddress_OperatorCode},</span>
                                                            <span>{account.eInvoicingAddress_Address},</span>
                                                            <span>{account.eInvoicingAddress_OVTCode}</span>
                                                        </dd>
                                                    </dl>
                                                </div>
                                                <div className="col-12">
                                                    <dl>
                                                        <dt>Contact person</dt>
                                                        <dd>
                                                            <span>{account.contactPerson_FullName},</span>
                                                            <span>{account.contactPerson_Phone},</span>
                                                            <span>{account.contactPerson_Email}</span>
                                                        </dd>
                                                    </dl>
                                                </div>
                                                <div className="col-12 mt-2 d-flex justify-content-between">
                                                    <NavLink className="btn btn--light-green"
                                                             to={`${companyId}/edit-company-info`}>
                                                        Edit company info
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="company-details__info white-shadow-box">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="section-title">Locations</div>
                                                </div>
                                                {account?.Locations?.map(el =>
                                                    <div key={el.id} className="col-12 col-lg-3 mb-4">
                                                        <LocationsLegend dataList={el} costCenters={costCenters}/>
                                                    </div>
                                                )}
                                                <div className="col-12 mt-3">
                                                    <NavLink className="btn btn--light-green"
                                                             to={`${url}/edit-company-locations`}>Edit
                                                        locations</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="company-details__info white-shadow-box">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="section-title">Company users</div>
                                                </div>
                                                {[].map(el =>
                                                    <div key={el.id} className="col-12 col-lg-6 mb-4">
                                                        <CompanyUsersLegend name="Customer admins"
                                                                            dataList={[1, 2, 3]}/>
                                                    </div>
                                                )}
                                                <div className="col-12 mt-4">
                                                    <NavLink className="btn btn--light-green btn--disabled" to="/mock">
                                                        Invite user
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </ErrorBoundary>
        </div>
    );
}

export default memo(CompanyDetails);
