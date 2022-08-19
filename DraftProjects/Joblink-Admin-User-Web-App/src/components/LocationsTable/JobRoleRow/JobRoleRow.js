import React, {memo, useEffect, useState} from 'react';
import classes from "../LocationsTable.module.scss"

const JobRoleRow = ({data, onEdit}) => {
    // States
    const [name, setName] = useState('');

    // Side Effects
    useEffect(() => {
        setName(data?.name)
    }, [data])

    return (
        <li className={`${classes.rowBox} bg-white`}>
            <span className={classes.value}>{name ? name : '...'}</span>
            <div className={classes.controls}>
                <div className={`${classes.rename}`} onClick={() => onEdit(data)}>
                    Edit
                </div>
            </div>
        </li>
    );
}

export default memo(JobRoleRow);
