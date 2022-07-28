import {baseInstance} from "./instances";

const accountAPI = {
    getAllCompanyAccount: () => {
        return baseInstance.get("/companyaccounts").then(res => res.data)
    },
    getOneCompany: (id) => {
        return baseInstance.get(`/companyaccounts/${id}`).then(res => res.data)
    },
    createOneCompanyAccount: (values) => {
        return baseInstance.post("/companyaccounts", values).then(res => res.data)
    },
    updateOneCompany: (id, values) => {
        return baseInstance.put(`/companyaccounts/${id}`, {...values}).then(res => res.data)
    }
}

export default accountAPI;
