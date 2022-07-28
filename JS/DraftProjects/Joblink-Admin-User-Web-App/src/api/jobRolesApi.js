import {baseInstance} from "./instances";

const jobRolesApi = {
    getOneJobRoleById: (id) => {
        return baseInstance.get(`/jobroles/${id}`).then(res => res.data)
    },
    createOneJobRole: (locationId, values) => {
        return baseInstance.post(`/jobroles`, {
            "name": values.jobRoleName,
            "accessDetails": values.accessDetails,
            "contactPerson_FullName": values.contactPerson,
            "contactPerson_Phone": values.contactPhone,
            "LocationId": locationId
        })
    },
    updateOneJobRoleById: (id, values) => {
        return baseInstance.put(`/jobroles/${id}`, {
            "name": values.jobRoleName,
            "accessDetails": values.accessDetails,
            "contactPerson_FullName": values.contactPerson,
            "contactPerson_Phone": values.contactPhone
        })
    },
    setJobRolesTaskList: (id, values) => {
        return baseInstance.put(`/jobroles/${id}/tasks`, [
            {
                "PresetTaskId": values.PresetTaskId,
                "SkillIds": values.SkillIds
            }
        ])
    }
}

export default jobRolesApi;
