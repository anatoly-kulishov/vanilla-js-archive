import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {Link, useRouteMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Select from "react-select";
import Modal from "react-modal";
import {SEARCH_ACCOUNTS} from "../../store/types";
import {selectTheme} from "../../theme";
import {searchByName} from "../../store/actions/appActions";
import Pagination from "../../components/Pagination";
import SearchPanel from "../../components/SearchPanel";
import Spinner from "../../components/Spinner";
import NoResultInTable from "../../components/NoResultInTable";
import {createOneCompanyAccount, getAllCompanyAccount} from "../../store/actions/accountsActions";
import {getAccountsLoadingStatus, getAccountsTerm, getAllAccounts} from "../../store/selectors/accounts-selectors";
import {getAllCostCenters} from "../../store/selectors/cost-centers-selectors";
import CompanyCreatingForm from "./CompanyCreatingForm/CompanyCreatingForm";

const Companies = () => {
    // Other Hooks
    const dispatch = useDispatch();
    const {url} = useRouteMatch();

    // Selectors
    const term = useSelector(getAccountsTerm);
    const fetchedAccounts = useSelector(getAllAccounts);
    const loading = useSelector(getAccountsLoadingStatus);
    const costCenters = useSelector(getAllCostCenters);

    // States
    const [costCentersOptions, setCostCentersOptions] = useState(null);
    const [costCenterName, setCostCenterName] = useState({value: "all", label: "All Cost centers"});
    const [isOpenCreatingCompanyModal, setIsOpenCreatingCompanyModal] = useState(false);
    const customStyles = {
        content: {
            maxWidth: 960
        }
    }

    // Actions
    const openModal = (callback) => callback(true);
    const closeModal = (callback) => callback(false);
    const visibleItem = useMemo(() => searchByName(fetchedAccounts, term), [fetchedAccounts, term]);
    const handleChangeFilter = useCallback(selectedOption => setCostCenterName(selectedOption), [setCostCenterName]);

    // Side Effects
    useEffect(() => {
        dispatch(getAllCompanyAccount());
    }, [dispatch])

    useEffect(() => {
        setCostCentersOptions(costCenters.map(el => ({value: el?.name, label: el?.name})))
        setCostCentersOptions(prev => [{value: "all", label: "All Cost centers"}, ...prev])
    }, [costCenters])


    return (
        <div className="app-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h1 className="title error-title">Companies</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-7">
                        <div className="d-flex align-items-end">
                            <div className="filters__body mr-3">
                                <div className="filter-group filter-group-companies">
                                    <div className="select-box">
                                        <label>
                                            <Select value={costCenterName}
                                                    onChange={handleChangeFilter}
                                                    options={costCentersOptions}
                                                    theme={selectTheme}/>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="search">
                                <SearchPanel type={SEARCH_ACCOUNTS} selector={state => state.accounts.term}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-5 mt-4 mb-4 mt-md-0 mb-md-0">
                        <div
                            className="d-flex justify-content-md-end align-items-center">
                            <button className="btn btn-md-block btn--green"
                                    onClick={() => openModal(setIsOpenCreatingCompanyModal)}>
                                Create new company
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <table className="table  d-table mt-40">
                            <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                            </thead>
                            <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={3}><Spinner/></td>
                                </tr>) : (visibleItem.length) ? visibleItem.map(company => (
                                <tr key={company.id}>
                                    <td className="link-in">
                                        <Link to={`${url}/${company.id}`}>{company.name}</Link>
                                    </td>
                                </tr>
                            )) : <NoResultInTable colSpan={2}/>}
                            </tbody>
                            <tfoot>
                            <tr>
                                <td colSpan={3}>
                                    <Pagination/>
                                </td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpenCreatingCompanyModal}
                   style={customStyles}
                   ariaHideApp={false}
                   contentLabel="Job role editing">
                <span className="icon-close" onClick={() => closeModal(setIsOpenCreatingCompanyModal)}/>
                <div className="modal-head">
                    <div className="modal-title">Company creating</div>
                </div>
                <div className="modal-body">
                    <CompanyCreatingForm
                        onSubmit={createOneCompanyAccount}
                        closeModal={() => closeModal(setIsOpenCreatingCompanyModal)}
                    />
                </div>
            </Modal>
        </div>
    );
}

export default memo(Companies);
