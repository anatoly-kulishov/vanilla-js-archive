const debounce = (callback, delay) => {
    let timeoutId

    return (...args) => {
        clearInterval(timeoutId);
        timeoutId = setTimeout(() => {
            timeoutId = null
            callback(...args)
        }, delay)
    }
}
