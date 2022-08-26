import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {
    CLIENT_PING_SUCCESS,
    HIDE_ALERT,
    HIDE_MODAL,
    INITIALIZED_SUCCESS,
    SHOW_ALERT,
    SHOW_MODAL, TOGGLE_NAV_BAR
} from "../types";
import {authMe} from "./authActions";
import {getAllJobEvents} from "./ordersActions";
import {getAllCompanyAccount} from "./accountsActions";
import {getAllCostCenters} from "./costCentersActions";
import {getAllPresetTasksAndSkills} from "./tasksActions";
import {getAllUsers} from "./usersActions";
import {getAllEmployees} from "./employeesActions";

/**
 * Initialize App
 * @param:boolean isAuth
 * @return {(function(*): void)|*}
 */
export const initializeApp = (isAuth) => {
    if (isAuth) {
        return (dispatch) => {
            const refreshTokenPromise = dispatch(authMe());
            const fetchOrdersPromise = dispatch(getAllJobEvents());
            const fetchAllAccountsPromise = dispatch(getAllCompanyAccount());
            const fetchAllCostCentersPromise = dispatch(getAllCostCenters());
            const fetchAllTasksPromise = dispatch(getAllPresetTasksAndSkills());
            const getAllUsersPromise = dispatch(getAllUsers());
            const getEmployeesPromise = dispatch(getAllEmployees());
            Promise.all([refreshTokenPromise, fetchOrdersPromise, fetchAllAccountsPromise, fetchAllCostCentersPromise, fetchAllTasksPromise, getAllUsersPromise, getEmployeesPromise])
                .then(() => dispatch(initializedSuccess()))
        }
    } else {
        return (dispatch) => {
            const refreshTokenPromise = dispatch(authMe());
            Promise.all([refreshTokenPromise])
                .then(() => dispatch(initializedSuccess()))
        }
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS})

export const clientPing = () => {
    return (dispatch) => {
        const refreshTokenPromise = dispatch(authMe());
        const getAllJobEventsPromise = dispatch(getAllJobEvents());
        Promise.all([refreshTokenPromise, getAllJobEventsPromise])
            .then(() => dispatch(clientPingSuccess()))
    }
}

export const clientPingSuccess = () => ({type: CLIENT_PING_SUCCESS})

export const searchByName = (items, term) => {
    if (term === 0) {
        return items;
    }
    return items.filter(item => {
        return (item.name)
            .toLowerCase()
            .indexOf(term.toLowerCase()) > -1;
    })
}

export const searchByFirstAndLastName = (items, term) => {
    if (term === 0) {
        return items;
    }
    return items?.filter(item => {
        return `${item.firstName} ${item.lastName}`
            .toLowerCase()
            .indexOf(term.toLowerCase()) > -1;
    })
}

// export const resetSearchTerm = (term) => {}

export const searchByJobRole = (items, term) => {
    return () => {
        if (term === 0) {
            return items;
        }
        return items.filter((item) => {
            return (item.JobRole.name)
                .toLowerCase()
                .indexOf(term.toLowerCase()) > -1;
        })
    }
}

export const exportToCSV = (csvData, fileName) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = {Sheets: {'data': ws}, SheetNames: ['data']};
    const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
}

export const showAlert = (color, text) => (dispatch) => {
    dispatch({
        type: SHOW_ALERT,
        payload: {color, text}
    })
}

export const hideAlert = () => ({type: HIDE_ALERT})

export const showModal = () => ({type: SHOW_MODAL})

export const hideModal = () => ({type: HIDE_MODAL})

export const toggleNavBar = () => ({type: TOGGLE_NAV_BAR})
