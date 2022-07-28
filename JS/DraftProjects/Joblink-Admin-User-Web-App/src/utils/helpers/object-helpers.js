import moment from "moment";

export const updateObjectArray = (items, itemId, objPropName, newObjProps) => {
    items.map((item) => {
        if (item[objPropName] === itemId) {
            return {...item, newObjProps: !item.newObjProps}
        }
        return item;
    })
}

export const deepEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export const stringEqual = (prevString, newString) => {
    if (prevString !== newString) {
        return newString
    }
    return prevString;
}

export const filterByStatus = (items, filter) => {
    switch (filter) {
        case 'open':
            return items.filter((item) => item.status === 'open')
        case 'failed':
            return items.filter((item) => item.status === 'failed')
        case 'filled':
            return items.filter((item) => item.status === 'filled')
        case 'unprocessed':
            return items.filter((item) => item.status === 'unprocessed')
        case 'canceled':
            return items.filter((item) => item.status === 'canceled')
        case 'completed':
            return items.filter((item) => item.status === 'completed')
        default:
            return items
    }
}

export const filterByCostCenter = (items, filter) => {
    switch (filter) {
        case 0:
            return items
        default:
            return items.filter((item) => item.JobRole.Location.CostCenterId === filter)
    }
}

export const filterByDate = (items = [], filter, currentDate = new Date()) => {
    switch (filter) {
        case 'last_week':
            return items.filter(item => {
                if (moment(item.start).diff(currentDate, 'weeks') === 0) {
                    return item
                }
                return null
            })
        case 'current_month':
            return items.filter(item => {
                if (moment(item.start).diff(currentDate, 'months') === 0) {
                    return item
                }
                return null
            })
        case 'last_month':
            return items.filter(item => {
                if (moment(item.start).diff(currentDate, 'months') === -1) {
                    return item
                }
                return null
            })
        case 'last_three_months':
            return items.filter(item => {
                if (moment(item.start).diff(currentDate, 'months') <= -3) {
                    return item
                }
                return null
            })
        case 'current_year':
            return items.filter(item => {
                if (moment(item.start).diff(currentDate, 'year') === 0) {
                    return item
                }
                return null
            })
        default:
            return items
    }
}
