import {baseInstance} from "./instances";

const authAPI = {
    signIn: (profile) => {
        return baseInstance.post("signin/Employee", profile).then(res => res.data)
    },
    // getMyProfile: () => {
    //     return baseInstance.post("profile", profile).then(res => res.data)
    // }

}

export default authAPI;