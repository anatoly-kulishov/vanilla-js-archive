import React, {memo, useEffect, useState} from 'react';
import classes from "./LocationsTable.module.scss"
import ErrorBoundary from "../ErrorBoundary";
import Spinner from "../Spinner";
import JobRoleRow from "./JobRoleRow";
import CostCenterRow from "./CostCenterRow/CostCenterRow";
import {useSelector} from "react-redux";
import {getAllCostCenters} from "../../store/selectors/cost-centers-selectors";

const LocationsTable = props => {
    const {
        data,
        isLoading = true,
        onCreate = (value) => console.log(value),
        onEditJobLocation = (id, value) => console.log(value),
        onEditJobRole = (id, value) => console.log(value),
    } = props;

    // Selectors
    const costCenters = useSelector(getAllCostCenters);

    // States
    const [isOpenCostCenter, setIsOpenCostCenter] = useState(true);
    const [state, setState] = useState(data);
    const [currentCostCenterName, setCurrentCostCenterName] = useState('')

    useEffect(() => {
        const costCenterName = costCenters?.filter(costCenter => costCenter.id === data.CostCenterId)?.[0]?.name;
        setCurrentCostCenterName(costCenterName)
    }, [costCenters, data.CostCenterId])

    // Side Effects
    useEffect(() => {
        setState(prev => data)
    }, [data])

    return (
        <ErrorBoundary>
            <>
                <div className={classes.crudTableBox}>
                    <div className={classes.crudTableTitle}>{state?.name}</div>
                    <span className={classes.editButton}
                          onClick={() => onEditJobLocation(state)}>Edit</span>
                </div>
                <ul className={classes.crudTableList}>
                    <CostCenterRow name={currentCostCenterName}
                                   isOpen={isOpenCostCenter}
                                   setIsOpen={setIsOpenCostCenter}/>
                    {isLoading && (
                        <li className={`${classes.crudTableBox} bg-white`}>
                            <Spinner/>
                        </li>
                    )}
                    {!isLoading && isOpenCostCenter && state?.JobRoles?.map(el => (
                        <JobRoleRow key={el.id}
                                    data={el}
                                    onEdit={onEditJobRole}/>
                    ))}
                    {(!isLoading && isOpenCostCenter && !state.JobRoles.length) && (
                        <div className={`${classes.noResult} bg-warning`}>
                            Sorry, no results were found.
                        </div>
                    )}
                    {!isLoading && (
                        <li className={`${classes.crudTableBox} bg-light-green color-green`}
                            onClick={() => onCreate(state?.id)}>
                            <span className={classes.add}>Add new role</span>
                        </li>
                    )}
                </ul>
            </>
        </ErrorBoundary>
    );
}

export default memo(LocationsTable);
