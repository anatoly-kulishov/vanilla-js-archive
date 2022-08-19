import {baseInstance} from "./instances";

const locationAPI = {
    getOneLocation: (id) => {
        return baseInstance.get(`/locations/${id}`).then(res => res.data)
    },
    createOneLocation: (companyId, CostCenterId, values) => {
        return baseInstance.post(`/locations`, {
            "name": values.locationName,
            "address_Street": values.addressStreet,
            "address_ZipCode": values.addressZipCode,
            "address_City": values.addressCity,
            "CompanyAccountId": companyId,
            "CostCenterId": CostCenterId
        }).then(res => res.data)
    },
    updateOneLocation: (id, values) => {
        return baseInstance.put(`/locations/${id}`, {
            "name": values.locationName,
            "address_Street": values.addressStreet,
            "address_ZipCode": values.addressZipCode,
            "address_City": values.addressCity
        }).then(res => res.data)
    }
}

export default locationAPI;
