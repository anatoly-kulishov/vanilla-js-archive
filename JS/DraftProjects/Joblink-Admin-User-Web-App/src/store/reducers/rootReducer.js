import {combineReducers} from "redux";
import authReducer from "./authReducer";
import appReducer from "./appReducer";
import ordersReducer from "./ordersReducer";
import usersReducer from "./usersReducer";
import accountsReducer from "./accountsReducer";
import costCentersReducer from "./costCentersReducer";
import tasksReducer from "./tasksReducer";
import employeesReducer from "./employeesReducer";
import locationsReducer from "./locationsReducer";
import jobRolesReducer from "./jobRolesReducer";
import certificatesReducer from "./certificatesReducer";

export const rootReducer = combineReducers({
    app: appReducer,
    login: authReducer,
    users: usersReducer,
    tasks: tasksReducer,
    orders: ordersReducer,
    accounts: accountsReducer,
    employees: employeesReducer,
    costCenters: costCentersReducer,
    locations: locationsReducer,
    jobRoles: jobRolesReducer,
    certificates: certificatesReducer
})