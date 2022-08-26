import React, {useEffect} from 'react';
import ErrorBoundary from "../../components/ErrorBoundary";
import SearchPanel from "../../components/SearchPanel";
import {SEARCH_CERTIFICATES} from "../../store/types";
import {searchByName} from "../../store/actions/appActions";
import CrudTable from "../../components/CrudTable/CrudTable";
import {skills} from "./data";

const SkillsCertificates = props => {
    const {title, term, certificateType, isLoading, getAllCertificateTypes} = props;
    const certificatesVisibleItem = searchByName(certificateType, term);

    useEffect(() => {
        getAllCertificateTypes()
    }, [getAllCertificateTypes]);

    return (
        <ErrorBoundary>
            <div className="app-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-lg-7">
                            <div className="d-md-flex align-items-center h-100">
                                <h1 className="title mb-0">{title}</h1>
                            </div>
                        </div>
                        <div className="col-12 col-lg-5">
                            <div className="d-flex justify-content-lg-end">
                                <div className="filter-group ml-3">
                                    <div className="search">
                                        <SearchPanel type={SEARCH_CERTIFICATES}
                                                     selector={state => state.certificates.term}
                                                     placeholder="Search..."/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-40">
                        <div className="col-12">
                            <div className="white-shadow-box">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="section-title">{title} list</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-6 mb-4 mb-lg-0">
                                        <CrudTable title="Skills"
                                                   data={skills}
                                                   isLoading={isLoading}/>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <CrudTable title="Certificates"
                                                   data={certificatesVisibleItem}
                                                   isLoading={isLoading}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
}

export default SkillsCertificates;
