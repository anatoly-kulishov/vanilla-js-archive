import {baseInstance} from "./instances";

const employeesAPI = {
    getAllEmployees: () => {
        return baseInstance.post('/employees', {
            "filters": {
                "available": {
                    "start": "2021-01-01T09:40:00.000Z",
                    "end": "2021-01-01T10:00:00.000Z"
                },
                "costCenterIds": [
                    1
                ]
            },
            "includes": {
                "AcceptedOffers": {
                    "start": "2021-01-01T00:00:00.000Z",
                    "end": "2021-01-02T00:00:00.000Z"
                },
                "ReceivedOffers": {
                    "start": "2021-01-01T00:00:00.000Z",
                    "end": "2021-01-02T00:00:00.000Z"
                },
                "RatedByJobRole": {
                    "JobRoleId": 1
                },
                "RatedJobRole": {
                    "JobRoleId": 1
                },
                "Skills": true,
                "Certificates": true
            }
        }).then(res => res.data)
    },
    getAllPotentialEmployees: (id) => {
        return baseInstance.get(`/jobevents/${id}/offer/employees`).then(res => res.data)
    },
    sendOfferToEmployees: (id, employees) => {
        return baseInstance.post(`/jobevents/${id}/offer/send`, [...employees]).then(res => res.data)
    },
    editEmployeeInfo: (id, values) => {
        return baseInstance.put(`/employees/${id}`, values)
    }
}

export default employeesAPI;
