import React, {useEffect} from "react";
import {Field, useField, useFormikContext} from "formik";
import locationAPI from "../../../api/locationAPI";

function setCompanies(id) {
    if (id) {
        locationAPI.getOneLocation(id)
            .then(data => {
                localStorage.setItem('companyAccount', JSON.stringify(data))
                localStorage.setItem('company', JSON.stringify(data.CompanyAccount))
            })
    }
}

const MyCompanies = (props) => {
    const {values: {location}, setFieldValue} = useFormikContext();
    const [field, meta] = useField(props);

    useEffect(() => {
        // eslint-disable-next-line
        let isCurrent = true;
        if (location?.trim() !== '') {
            setCompanies(location)
            setTimeout(() => {
                setFieldValue('company', JSON.parse(localStorage.getItem('company'))?.name)
            }, 200)
        } else {
            setFieldValue('company', "")
        }
        return () => {
            isCurrent = false;
        };
    }, [location, setFieldValue, props.name]);

    return (
        <>
            <Field  {...props} {...field} />
            {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
        </>
    );
};

export default MyCompanies;
