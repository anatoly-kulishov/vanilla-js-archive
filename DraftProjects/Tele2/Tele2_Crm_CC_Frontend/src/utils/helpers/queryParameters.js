export function setQueryParameters (params, exception = []) {
  const newParams = new URLSearchParams(window.location.search)
  for (const [name, value] of Object.entries(params)) {
    if (value !== undefined && !exception.includes(name)) {
      value && newParams.set(name, value)
    }
  }
  return newParams
}

/**
 * Return query parameters from URL string
 * @param {string} searchString
 * @returns {object} query parameters as {[key]: value} object
 */
export function getQueryParameters (searchString) {
  const urlSearchParams = new URLSearchParams(searchString)
  return Object.fromEntries(urlSearchParams.entries())
}

export default {
  setQueryParameters,
  getQueryParameters
}
