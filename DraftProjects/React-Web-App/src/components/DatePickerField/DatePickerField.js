import React from "react";
import {useField, useFormikContext} from "formik";
import DatePicker from "react-datepicker";

const DatePickerField = ({...props}) => {
    const {setFieldValue} = useFormikContext();
    const [field] = useField(props);
    return (
        <DatePicker
            className="form-control"
            {...field}
            {...props}
            selected={(field.value && new Date(field.value)) || null}
            onChange={val => {
                setFieldValue(field.name, val);
            }}
        />
    );
}

export default DatePickerField;