import React, {memo} from 'react';
import classes from "../LocationsTable.module.scss"

const CostCenterRow = props => {
    const {name, isOpen, setIsOpen} = props;

    return (
        <li className={`${classes.rowBox} bg-white`}>
            <span className={classes.value}>{name ? name : '...'}</span>
            <div className={classes.controls}>
                <div className={`${!isOpen && 'reverse'} mr-2`} onClick={() => setIsOpen(!isOpen)}>
                    <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.5 1.33301L5.5 5.33301L1.5 1.33301L9.5 1.33301Z" fill="#A1A1AA" stroke="#A1A1AA"
                              strokeWidth="2" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
        </li>
    );
}

export default memo(CostCenterRow);
