import React, {memo, useEffect, useState} from 'react';
import classes from "./CrudRow.module.scss";
import {useDispatch} from "react-redux";

const CrudRow = props => {
    const {data, onCreate, onUpdate, onDelete, createMode} = props;

    // Other Hooks
    const dispatch = useDispatch();

    // States
    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState(!createMode && data.name);

    useEffect(() => {
        if (!createMode) {
            setValue(value)
        }
    }, [data, createMode, value])

    useEffect(() => {
        if (createMode) {
            setValue('');
            setEditMode(!editMode)
        }
    }, [data, createMode, editMode])

    const onSaveHandler = (id, name) => {
        console.log(id)
        dispatch(onUpdate(id, {
            name
        }))
        setEditMode(!editMode)
    }

    const onCreateHandler = (id, name) => {
        onCreate(id, name)
        setEditMode(!editMode)
    }

    const onCancelHandler = () => {
        console.log(data.name)
        setValue(data.name);
        setEditMode(!editMode)
    }

    return (
        <>
            {editMode && !createMode && (
                <li className={`relative bg-white`}>
                    <input className={classes.input}
                           value={value}
                           autoFocus
                           onChange={e => setValue(e.target.value)}/>
                    <div className={classes.controls}>
                        <div onClick={() => onSaveHandler(data.id, value)}
                             className={`${classes.save} mr-3`}>Save
                        </div>
                        <div onClick={onCancelHandler}
                             className={classes.cancel}>Cancel
                        </div>
                    </div>
                </li>
            )}
            {editMode && createMode && (
                <li className={`relative bg-white`}>
                    <input className={classes.input}
                           value={value}
                           autoFocus
                           onChange={e => setValue(e.target.value)}/>
                    <div className={classes.controls}>
                        <div onClick={() => onCreateHandler(value)}
                             className={`${classes.save} mr-3`}>Save
                        </div>
                        <div onClick={onCancelHandler}
                             className={classes.cancel}>Cancel
                        </div>
                    </div>
                </li>
            )}
            {!editMode && (
                <li className={`${classes.rowBox} bg-white`}
                    onDoubleClick={() => setEditMode(!editMode)}>
                    <span className={classes.value}>{value}</span>
                    <div className={classes.controls}>
                        <div onClick={() => setEditMode(!editMode)}
                             className={`${classes.rename} mr-3`}>Rename
                        </div>
                        <div onClick={() => onDelete(data.id)}
                             className={classes.delete}>Delete
                        </div>
                    </div>
                </li>
            )}
        </>
    );
}

export default memo(CrudRow);
