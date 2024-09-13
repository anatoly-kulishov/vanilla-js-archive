import { checkRight } from 'utils/helpers'
/**
* This selector takes a state object and required permissions to check user rights against
* @param {Object.<string, any>} state a state argument from mapStateToProps
* @param {string[]} permissions an array of permissions to check against
* @return {Object.<string, Boolean>} returns an object of bool permissions values with the permission name for the key without a colon
*/
export const getPermissions = (state, permissions) => {
  if (Array.isArray(permissions)) {
    const checkedPermissions = permissions.map(permission => {
      const key = permission.replace(/:/g, '')
      return {
        [key]: checkRight(state.internal.userState.user, permission)
      }
    })
    return Object.assign({}, ...checkedPermissions)
  } else {
    throw new TypeError('permissions must be an array')
  }
}
