/*********************** Simple Selectors ***********************/
export const getOrders = (state) => {
    return state.orders.fetchedOrders
}

export const getOrderCreatedStatus = (state) => {
    return state.orders.orderCreatedStatus
}

export const getOrdersLoadingStatus = (state) => {
    return state.orders.loading
}

export const getOrdersAlert = (state) => {
    return state.orders.alert
}

export const getOrdersTerm = (state) => {
    return state.orders.term
}



