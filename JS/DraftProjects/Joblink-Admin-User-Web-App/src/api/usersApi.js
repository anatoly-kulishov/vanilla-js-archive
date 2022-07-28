import {baseInstance} from "./instances";

const usersAPI = {
    getAllUsers: () => {
        return baseInstance.get('/joblinkusers').then(res => res.data)
    },
    getUserById: (id) => {
        return baseInstance.get(`/joblinkusers/${id}`).then(res => res.data)
    },
    updateUserById: (id, values) => {
        return baseInstance.put(`/joblinkusers/${id}`, values)
    }
}

export default usersAPI;