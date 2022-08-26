import {baseInstance} from "./instances";

const ordersAPI = {
    getAllJobEvents: () => {
        return baseInstance.get('/jobevents').then(({data}) => data.reverse())
    },
    getOneJobEvent: (id) => {
        return baseInstance.get(`/jobevents/${id}`).then(res => res.data)
    },
    createNewOrder: (values, eventSkills) => {
        return baseInstance.post('/jobevents/_/order', {
            "start": values.startTime,
            "end": values.endTime,
            "TaskId": parseInt(values.task),
            "EventSkills": eventSkills,
            "JobOrder": {
                "description": values.description
            }
        })
    },
    cancelOrderByEvent: (id) => {
        return baseInstance.delete(`/jobevents/${id}/order/cancel`)
    },
    createJobOffer: (id, description) => {
        return baseInstance.post(`/jobevents/${id}/offer`, {description})
    },
    cancelOneJobOffer: (id) => {
        return baseInstance.delete(`/jobevents/${id}/offer/cancel`)
    },
    abortOneJobOffer: (id) => {
        return baseInstance.delete(`/jobevents/${id}/offer/abort`)
    },
    reActivateJobOffer: (id) => {
        return baseInstance.put(`/jobevents/${id}/offer/reactivate`)
    },
    submitJobLogFinal: (id, decision, comment) => {
        return baseInstance.post(`/jobevents/${id}/joblog/Joblink`, {
            "Joblink_Decision": decision ? "accept" : 'reject',
            "Joblink_DecisionComment": comment
        })
    }
}

export default ordersAPI;
