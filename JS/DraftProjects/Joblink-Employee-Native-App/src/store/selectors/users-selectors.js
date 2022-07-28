// import {createSelector} from "reselect";
// import moment from "moment";
// import {DATE_FORMAT} from "../../constants";

/*********************** Simple Selectors ***********************/
export const getEmployeesSelector = (state) => state.employees.employees;

/*********************** Super Selectors ***********************/
// export const getNewJobOffers = createSelector(
//     [getEmployeesSelector],
//     (employees) => {
//         return employees?.ReceivedOffers?.filter(offer => offer.JobEvent.phase === 'offer' && offer.SentEmployees.type === 'not_responded')
//             // .map(offer => moment(offer.JobEvent.start).format(DATE_FORMAT))
//     })
