import certificatesAPI from "../../api/certificatesApi";
import {FETCH_CERTIFICATES} from "../types";

/**
 * Get all certificate types.
 * @returns {(function(*): void)|*}
 */
export const getAllCertificateTypes = () => {
    return (dispatch) => {
        certificatesAPI.getAllCertificateTypes().then(data => {
            dispatch({
                type: FETCH_CERTIFICATES,
                certificateType: data
            })
        }).catch((e) => console.log(e));
    }
}