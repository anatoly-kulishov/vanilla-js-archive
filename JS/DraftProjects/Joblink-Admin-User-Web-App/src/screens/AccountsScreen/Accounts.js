import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {SEARCH_USERS} from "../../store/types";
import {searchByFirstAndLastName} from "../../store/actions/appActions";
import ErrorBoundary from "../../components/ErrorBoundary";
import SearchPanel from "../../components/SearchPanel";
import NoResultInTable from "../../components/NoResultInTable";
import Pagination from "../../components/Pagination";
import Spinner from "../../components/Spinner";
import InviteModal from "./InviteModal";

const Accounts = props => {
    const {term, title, role, users, admins, loading, costCenters, accountsResponse} = props;
    const roleData = (role === 'admin') ? admins : users;
    const visibleItem = searchByFirstAndLastName(roleData, term);

    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        setModalData(costCenters)
    }, [costCenters])

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <ErrorBoundary>
            <div className="app-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="title error-title">{title}</h1>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="filter-group joblink-users-filter-group">
                                <div className="search">
                                    <SearchPanel type={SEARCH_USERS} selector={state => state.users.termUsers}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 mt-4 mb-4 mb-md-0 mt-md-0">
                            <div className="d-flex justify-content-md-end">
                                <button className="btn btn-md-block btn--green" onClick={() => openModal()}>
                                    Send invite
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mt-smd-0 mt-40">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                                </thead>
                                <tbody>
                                {(loading) ? (
                                        <tr>
                                            <td colSpan={2}><Spinner/></td>
                                        </tr>)
                                    : (visibleItem.length) ? visibleItem.map(el => (
                                        <tr key={el.id}>
                                            <td className="link-in">
                                                <Link to={`/accounts-joblink/${el.id}`}>
                                                    {el.firstName} {el.lastName}
                                                </Link>
                                            </td>
                                            <td className="link-in">
                                                <Link to={`/accounts-joblink/${el.id}`}>
                                                    {el.email}
                                                </Link>
                                            </td>
                                        </tr>
                                    )) : <NoResultInTable colSpan={2}/>}
                                </tbody>
                                <tfoot>
                                <tr>
                                    <td colSpan={2}>
                                        <Pagination/>
                                    </td>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <InviteModal role={role}
                         data={modalData}
                         maxWidth={680}
                         response={accountsResponse}
                         modalIsOpen={modalIsOpen}
                         closeModal={closeModal}/>
        </ErrorBoundary>
    );
}

export default Accounts;
