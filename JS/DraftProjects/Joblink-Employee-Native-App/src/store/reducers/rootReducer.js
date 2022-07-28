import {combineReducers} from "redux";
import authReducer from "./authReducer";
import appReducer from "./appReducer";
import calendarReducer from "./calendarReducer";
import employeesReducer from "./employeesReducer";
import offersReducer from "./offersReducer";

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    calendar: calendarReducer,
    employees: employeesReducer,
    offers: offersReducer
})
