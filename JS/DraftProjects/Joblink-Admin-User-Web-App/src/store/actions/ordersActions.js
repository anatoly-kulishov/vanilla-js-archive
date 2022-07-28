import {
    FETCH_ORDERS,
    NEW_ORDER_CREATED_FAILED,
    NEW_ORDER_CREATED_SUCCESS,
    RESET_SELECTED_ORDER, RESET_STATUS_CREATED_ORDER,
    SELECT_ORDER,
    SHOW_ORDERS_LOADER
} from "../types";
import {errorMessage} from "../../constants";
import ordersAPI from "../../api/ordersAPI";

/**
 * Retrieve all job events. Query parameters are for filtering.
 * If you want to exclude any filter, simply ignore its query parameters.
 * Returns all job events that match all included filtering conditions.
 * Tip: parse response's start/end date in JavaScript: const date = new Date(body[0].start)
 * @returns {(function(*): void)|*}
 */
export const getAllJobEvents = () => {
    return (dispatch) => {
        ordersAPI.getAllJobEvents().then(data => {
            dispatch({
                type: FETCH_ORDERS,
                fetchedOrders: data
            })
        }).catch((e) => console.log(e));
    }
}

/**
 * Retrieve a job event's details by its ID.
 * Tip: parse response's start/end date in JavaScript: const date = new Date(body.start).
 * @param:number id
 * @returns {(function(*): void)|*}
 */
export const getOneJobEvent = (id) => {
    return (dispatch) => {
        ordersAPI.getOneJobEvent(id).then(data => {
            localStorage.setItem('selectedOrder', JSON.stringify(data))
            dispatch({
                type: SELECT_ORDER,
                payload: data
            })
        }).catch((e) => console.log(e));
    }
}

export const resetSelectedOrder = () => ({
    type: RESET_SELECTED_ORDER,
})

/**
 * Start a job event by creating a job order.
 * The job event is attached to a job role's task.
 * @param:object values
 * @return {(function(*): void)|*}
 */
export const createNewOrder = (values) => {
    const eventSkills = values.eventSkills.map(el => {
        return {"SkillId": parseInt(el)}
    })
    return (dispatch) => {
        ordersAPI.createNewOrder(values, eventSkills).then(() => {
            dispatch({
                type: NEW_ORDER_CREATED_SUCCESS,
                payload: {
                    status: 'success',
                    text: "Order successfully created"
                }
            })
        }).then(() => dispatch(getAllJobEvents())).catch((e) => {
            console.log(e)
            dispatch({
                type: NEW_ORDER_CREATED_FAILED,
                payload: {
                    status: 'danger',
                    text: errorMessage
                }
            })
        })
    }
}

export const showOrderLoader = () => ({type: SHOW_ORDERS_LOADER})

/**
 * Cancel one job order by sending its event
 * @param:number id
 * @returns {(function(*): void)|*}
 */
export const cancelOrderByEvent = (id) => {
    return (dispatch) => {
        ordersAPI.cancelOrderByEvent(id)
            .then(() => dispatch(getAllJobEvents()))
            .catch((e) => console.log(e));
    }
}

/**
 * Proceed a job event to job offer.
 * The job event must be in order phase.
 * @param:number id
 * @param:string description
 * @returns {(function(*): void)|*}
 */
export const createJobOffer = (id, description) => {
    return (dispatch) => {
        ordersAPI.createJobOffer(id, description)
            .then(() => dispatch(getAllJobEvents()))
            .catch((e) => console.log(e));
    }
}

/**
 * Cancel one job offer by sending its event.
 * @param:number id
 * @returns {(function(*): void)|*}
 */
export const cancelOneJobOffer = (id) => {
    return (dispatch) => {
        ordersAPI.cancelOneJobOffer(id)
            .then(() => dispatch(getAllJobEvents()))
            .catch((e) => console.log(e));
    }
}

/**
 * Cancel one job offer by sending its event.
 * @param:number id
 * @returns {(function(*): void)|*}
 */
export const abortOneJobOffer = (id) => {
    return (dispatch) => {
        ordersAPI.abortOneJobOffer(id)
            .then(() => dispatch(getAllJobEvents()))
            .catch((e) => console.log(e));
    }
}

/**
 * Re-activate a canceled job offer by sending its event's :id
 * The event must be a canceled Job event, otherwise an error is returned.
 * @param:number id
 * @returns {(function(*): void)|*}
 */
export const reActivateJobOffer = (id) => {
    return (dispatch) => {
        ordersAPI.reActivateJobOffer(id)
            .then(() => dispatch(getAllJobEvents()))
            .catch((e) => console.log(e));
    }
}

/**
 * JA submits the job log's final for job event :id, putting an end to this case.
 * However, JA can still anytime change the decision of this job event.
 * @param:number id
 * @param:string decision
 * @param:string comment
 * @returns {(function(*): void)|*}
 */
export const submitJobLogFinal = (id, decision, comment) => {
    return (dispatch) => {
        ordersAPI.submitJobLogFinal(id, decision, comment)
            .then(() => dispatch(getAllJobEvents()))
            .catch((e) => console.log(e));
    }
}

export const resetCreatedStatusOrder = () => ({type: RESET_STATUS_CREATED_ORDER});


