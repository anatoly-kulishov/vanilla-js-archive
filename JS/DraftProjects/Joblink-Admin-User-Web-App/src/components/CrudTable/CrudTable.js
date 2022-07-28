import React, {memo, useState} from 'react';
import ErrorBoundary from "../ErrorBoundary";
import Spinner from "../Spinner";
import CrudRow from "./CrudRow";
import classes from "./CrudTable.module.scss"

const CrudTable = props => {
    const {
        title = '',
        data = [],
        isLoading = true,
        onCreate = (value) => console.log(value),
        onUpdate = (id, value) => console.log(value),
        onDelete = (id) => console.log(id)
    } = props;

    // eslint-disable-next-line
    const [addingNewRowState, setAddingNewRowState] = useState(false);

    const onAddNewRow = () => {
        console.log('onAddNewRow()')
        // setAddingNewRowState(!addingNewRowState);
    }

    const createNewRow = (value) => {
        console.log('createNewRow()')
        onCreate(value);
        // setAddingNewRowState(!addingNewRowState)
    }

    return (
        <ErrorBoundary>
            <>
                <div className={classes.crudTableBox}>
                    <div className={classes.crudTableTitle}>{title ? title : data?.name}</div>
                </div>
                <ul className={classes.crudTableList}>
                    {isLoading && (
                        <li className={`${classes.crudTableBox} bg-white`}>
                            <Spinner/>
                        </li>
                    )}
                    {!isLoading && data?.map(el => (
                        <CrudRow key={el.id}
                                 data={el}
                                 onUpdate={onUpdate}
                                 onDelete={onDelete}/>
                    ))}
                    {!isLoading && !data.length && (
                        <div className={`${classes.noResult} bg-warning`}>
                            Sorry, no results were found.
                        </div>
                    )}
                    {addingNewRowState && (
                        <CrudRow createMode={true}
                                 onCreate={createNewRow}/>
                    )}
                    {!isLoading && !addingNewRowState && (
                        <li className={`${classes.crudTableBox} bg-light-green color-green`}
                            onClick={onAddNewRow}>
                            <span className={classes.add}>Add new</span>
                        </li>
                    )}
                </ul>
            </>
        </ErrorBoundary>
    );
}

export default memo(CrudTable);
