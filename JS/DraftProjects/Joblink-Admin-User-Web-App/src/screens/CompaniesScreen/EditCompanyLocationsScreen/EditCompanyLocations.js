import React, {memo, useEffect, useState} from 'react';
import {useRouteMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Modal from "react-modal";
import {SEARCH_LOCATIONS} from "../../../store/types";
import LinkBack from "../../../components/LinkBack";
import SearchPanel from "../../../components/SearchPanel";
import {getOneCompany} from "../../../store/actions/accountsActions";
import LocationsTable from "../../../components/LocationsTable/LocationsTable";
import JobRoleEditingForm from "./JobRoleEditingForm/JobRoleEditingForm";
import {createOneJobRole, updateOneJobRoleById} from "../../../store/actions/jobRolesActions";
import {getCostCentersLoadingStatus} from "../../../store/selectors/cost-centers-selectors";
import {getAccountsLoadingStatus, getSelectedAccount} from "../../../store/selectors/accounts-selectors";
import {searchByName} from "../../../store/actions/appActions";
import {getLocationsTerm} from "../../../store/selectors/locations-selectors";
import CreateLocationForm from "./LocationCreatingForm/LocationCreatingForm";
import {createOneLocation, updateOneLocation} from "../../../store/actions/locationsActions";
import EditLocationForm from "./LocationEditingForm";
import JobRoleCreatingForm from "./JobRoleCreatingForm";

const EditCompanyLocations = () => {
    // Other Hooks
    const dispatch = useDispatch();
    const {params} = useRouteMatch();

    // Selectors
    const account = useSelector(getSelectedAccount)
    const isLoadingCostCenters = useSelector(getCostCentersLoadingStatus)
    const isLoadingAccounts = useSelector(getAccountsLoadingStatus)
    const term = useSelector(getLocationsTerm)

    // States
    const [companyId] = useState(params.companyId);
    const [isLoading, setIsLoading] = useState(true);

    const [isOpenCreateLocationModal, setIsOpenCreateLocationModal] = useState(false);
    const [isOpenEditLocationModal, setIsOpenEditLocationModal] = useState(false);
    const [isOpenCreateJobRoleModal, setIsOpenCreateJobRoleModal] = useState(false);
    const [isOpenEditJobRoleModal, setIsOpenEditJobRoleModal] = useState(false);

    const [jobRoleCreateModalData, setJobRoleCreateModalData] = useState(null);
    const [jobRoleEditModalData, setJobRoleEditModalData] = useState(null);
    const [locationEditModalData, setLocationEditModalData] = useState(null);
    const [visibleItem, setVisibleItem] = useState(null);

    const customStyles = {
        content: {
            maxWidth: 640
        }
    }

    // Actions
    const openModal = (callback) => callback(true);
    const closeModal = (callback) => callback(false);

    const openEditJobRoleModal = (values) => {
        openModal(setIsOpenEditJobRoleModal)
        setJobRoleEditModalData(values)
    }

    const openEditLocationModal = (values) => {
        openModal(setIsOpenEditLocationModal)
        setLocationEditModalData(values)
    }

    const openCreateJobRoleModal = (locationId) => {
        openModal(setIsOpenCreateJobRoleModal)
        setJobRoleCreateModalData(locationId)
    }

    // Side Effects
    useEffect(() => {
        dispatch(getOneCompany(companyId))
    }, [dispatch, companyId])

    useEffect(() => {
        if (!isLoadingCostCenters && !isLoadingAccounts) setIsLoading(false);
    }, [isLoadingCostCenters, isLoadingAccounts])

    useEffect(() => {
        setVisibleItem(account?.Locations && searchByName(account.Locations, term))
    }, [account, term])

    return (
        <>
            <div className="app-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <div className="link-back">
                                <LinkBack title="Back to Company"/>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-12 col-xl-4">
                            <h1 className="title error-title mb-3">Company locations</h1>
                        </div>
                        <div className="col-12 col-xl-8">
                            <div className="d-md-flex justify-content-xl-end align-items-center">
                                <div className="mr-3 mb-3 mb-md-0">
                                    <button className="btn btn--light-green"
                                            onClick={() => openModal(setIsOpenCreateLocationModal)}>
                                        Create new location
                                    </button>
                                </div>
                                <div className="search">
                                    <SearchPanel type={SEARCH_LOCATIONS}
                                                 selector={state => state.locations.term}
                                                 placeholder="Search..."/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="company-details__info white-shadow-box pb-2">
                                <div className="small-title">Locations</div>
                                <div className="row small-padding-col">
                                    {!isLoadingCostCenters && !isLoadingAccounts && visibleItem?.map((location) => (
                                        <div className="col-12 col-lg-6 mb-3" key={location.id}>
                                            <LocationsTable
                                                data={location}
                                                onEditJobRole={openEditJobRoleModal}
                                                onEditJobLocation={openEditLocationModal}
                                                onCreate={openCreateJobRoleModal}
                                                isLoading={isLoading}/>
                                        </div>
                                    ))}
                                    {visibleItem?.length === 0 && (
                                        <div className="col-12 pb-2">
                                            <div className={`no-result bg-warning`}>
                                                Sorry, no results were found.
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpenCreateLocationModal}
                   style={customStyles}
                   ariaHideApp={false}
                   contentLabel="Company location creating">
                <span className="icon-close" onClick={() => closeModal(setIsOpenCreateLocationModal)}/>
                <div className="modal-head">
                    <div className="modal-title">Company location creating</div>
                </div>
                <div className="modal-body">
                    <CreateLocationForm
                        onSubmit={createOneLocation}
                        companyId={companyId}
                        closeModal={() => closeModal(setIsOpenCreateLocationModal)}
                    />
                </div>
            </Modal>
            <Modal isOpen={isOpenEditLocationModal}
                   style={customStyles}
                   ariaHideApp={false}
                   contentLabel="Job role editing">
                <span className="icon-close" onClick={() => closeModal(setIsOpenEditLocationModal)}/>
                <div className="modal-head">
                    <div className="modal-title">Company locations editing</div>
                </div>
                <div className="modal-body">
                    <EditLocationForm
                        data={locationEditModalData}
                        companyId={companyId}
                        onSubmit={updateOneLocation}
                        closeModal={() => closeModal(setIsOpenEditLocationModal)}/>
                </div>
            </Modal>
            <Modal isOpen={isOpenCreateJobRoleModal}
                   style={customStyles}
                   ariaHideApp={false}
                   contentLabel="Job role creating">
                <span className="icon-close" onClick={() => closeModal(setIsOpenCreateJobRoleModal)}/>
                <div className="modal-head">
                    <div className="modal-title">Job role creating</div>
                </div>
                <div className="modal-body">
                    <JobRoleCreatingForm
                        companyId={companyId}
                        locationId={jobRoleCreateModalData}
                        onSubmit={createOneJobRole}
                        closeModal={() => closeModal(setIsOpenCreateJobRoleModal)}/>
                </div>
            </Modal>
            <Modal isOpen={isOpenEditJobRoleModal}
                   style={customStyles}
                   ariaHideApp={false}
                   contentLabel="Job role editing">
                <span className="icon-close" onClick={() => closeModal(setIsOpenEditJobRoleModal)}/>
                <div className="modal-head">
                    <div className="modal-title">Job role editing</div>
                </div>
                <div className="modal-body">
                    <JobRoleEditingForm
                        data={jobRoleEditModalData}
                        companyId={companyId}
                        onSubmit={updateOneJobRoleById}
                        closeModal={() => closeModal(setIsOpenEditJobRoleModal)}/>
                </div>
            </Modal>
        </>
    );
}

export default memo(EditCompanyLocations);
