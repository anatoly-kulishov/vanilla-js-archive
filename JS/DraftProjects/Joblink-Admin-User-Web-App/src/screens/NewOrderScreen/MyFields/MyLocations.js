import React, {useEffect} from "react";
import {Field, useField, useFormikContext} from "formik";

function setLocations(dep, costCenters) {
    if (costCenters && dep) {
        localStorage.setItem('location', JSON.stringify(costCenters[--dep]?.Locations))
    }
}

const MyLocations = (props) => {
    const {values: {costCenter}, setFieldValue} = useFormikContext();
    const [field, meta] = useField(props);

    useEffect(() => {
        // eslint-disable-next-line
        let isCurrent = true;
        if (costCenter?.trim() !== '') {
            setLocations(costCenter, props.costcenters)
        } else {
            setFieldValue('location', "")
        }
        return () => {
            isCurrent = false;
        };
    }, [costCenter, setFieldValue, props.costcenters]);

    return (
        <>
            <Field  {...props} {...field} />
            {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
        </>
    );
};

export default MyLocations;
