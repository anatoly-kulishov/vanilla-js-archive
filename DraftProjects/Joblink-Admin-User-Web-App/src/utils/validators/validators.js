const validators = {
    required: (value) => {
        if (value) return undefined;
        return "Field is required";
    },
    maxLengthCreator: (maxLength) => (value) => {
        if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
        return undefined;
    }
}

export default validators;
