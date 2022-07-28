import React, {useEffect} from 'react';
import {SEARCH_COST_CENTERS} from "../../store/types";
import {searchByName} from "../../store/actions/appActions";
import ErrorBoundary from "../../components/ErrorBoundary";
import SearchPanel from "../../components/SearchPanel";
import Spinner from "../../components/Spinner";
import NoResultInTable from "../../components/NoResultInTable";
import DropTableRow from "./DropTableRow";

const CostCenters = props => {
    const {title, term, costCenters, isLoading, getAllCostCenters, accounts} = props;
    const visibleItem = searchByName(costCenters, term);

    useEffect(() => {
        getAllCostCenters()
    }, [getAllCostCenters])

    const deleteCostCenter = (id) => console.log(`deleteCostCenter(${id})`);
    const renameCostCenter = (id) => console.log(`onRenameCostCenter(${id})`);

    return (
        <ErrorBoundary>
            <div className="app-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-lg-8">
                            <div className="d-md-flex align-items-center">
                                <h1 className="title mb-md-0 mr-0 mr-md-4">{title}</h1>
                                <SearchPanel type={SEARCH_COST_CENTERS}
                                             selector={state => state.costCenters.term}/>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 mt-4 mb-4 mt-md-0 mb-md-0">
                            <div className="d-flex justify-content-lg-end">
                                <button className="btn btn--green" disabled>Create new cost center</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <table className="table border-none mt-40">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Locations</th>
                                    <th/>
                                </tr>
                                </thead>
                                <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={3}><Spinner/></td>
                                    </tr>) : (visibleItem.length) ? visibleItem.map(costCenter => (
                                    <DropTableRow key={costCenter.id}
                                                  costCenter={costCenter}
                                                  accounts={accounts}
                                                  onRename={renameCostCenter}
                                                  onDelete={deleteCostCenter}/>
                                )) : <NoResultInTable colSpan={3}/>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
}

export default CostCenters;
