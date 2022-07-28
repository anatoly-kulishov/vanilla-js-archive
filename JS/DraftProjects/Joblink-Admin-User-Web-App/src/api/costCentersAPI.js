import {baseInstance} from "./instances";

const costCentersAPI = {
    getAllCostCenters: () => {
        return baseInstance.get("/costcenters").then(res => res.data)
    },
    createOneCostCenter: (costCenterName) => {
        return baseInstance.post("/costcenters", {
            "name": costCenterName
        })
    },
    updateOneCostCenterById: (id, costCenterName) => {
        return baseInstance.put(`/costcenters/${id}`, {
            "name": costCenterName
        })
    }
}

export default costCentersAPI;
