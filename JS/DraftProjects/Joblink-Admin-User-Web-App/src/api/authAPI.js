import {baseInstance} from "./instances";

const authAPI = {
    signIn: (profile) => {
        return baseInstance.post("signin/JoblinkUser", profile).then(res => res.data)
    },
    authMe: () => {
        return baseInstance.get("/profile").then(res => res.data)
    },
}

export default authAPI;