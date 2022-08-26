/**
 * Check All Unhandled Errors
 * @param reason
 */
export const catchAllUnhandledErrors = (reason) => {
    window.alert('Some error occurred')
    console.log(reason)
}