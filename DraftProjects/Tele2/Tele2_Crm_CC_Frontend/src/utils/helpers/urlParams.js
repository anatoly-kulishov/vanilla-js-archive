import history from 'utils/createdHistory'

export function urlParams () {
  const params = new URLSearchParams(window.location.search)

  function deleteParam (param) {
    params.delete(param)
    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState({}, '', newUrl)
    history.push(newUrl)
  }

  function addParam (paramName, value) {
    params.set(paramName, value)
    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState({}, '', newUrl)
    history.push(newUrl)
  }

  return {
    deleteParam,
    addParam
  }
}
