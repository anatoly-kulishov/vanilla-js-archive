import {baseInstance} from "./instances";

const certificatesAPI = {
    getAllCertificateTypes: () => {
        return baseInstance.get('/certificatetypes').then(res => res.data)
    }
}

export default certificatesAPI;