import React, {useEffect} from "react";
import {Field, useField, useFormikContext} from "formik";

const MyJobRoles = (props) => {
    const {values: {company}, setFieldValue} = useFormikContext();
    const [field, meta] = useField(props);

    useEffect(() => {
        // eslint-disable-next-line
        let isCurrent = true;
        if (company?.trim() !== '') {
        } else {
            setFieldValue('jobRole', "")
        }
        return () => {
            isCurrent = false;
        };
    }, [company, setFieldValue, props.name]);

    return (
        <>
            <Field  {...props} {...field} />
            {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
        </>
    );
};

export default MyJobRoles;
