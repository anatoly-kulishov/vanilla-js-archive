export function setQueryParameters (params) {
  const newParams = new URLSearchParams(window.location.search)
  for (const [name, value] of Object.entries(params)) {
    newParams.set(name, value)
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
