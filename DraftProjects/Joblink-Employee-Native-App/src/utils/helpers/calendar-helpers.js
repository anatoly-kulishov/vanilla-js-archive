export const filterEventsForCalendarIcons = (offers = [], label = '', setState, flag, setFlag) => {
    const offersArray = offers.map(offer => {
        return {[offer]: label}
    })
    if (offersArray?.length) {
        setState(Object.assign({}, ...offersArray));
        setFlag(!flag);
    }
}