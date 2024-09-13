// Passing the parameter to the URL without refreshing the page.
// It's necessary for CallClient integration.
export default function passHandlingTechId (handlingTechId, isReplace) {
  let newUrl = `${window.location.pathname}${window.location.search}&handlingTechId=${handlingTechId}`
  if (isReplace) {
    const params = new URLSearchParams(window.location.search)
    params.delete('handlingTechId')
    params.set('handlingTechId', handlingTechId)
    newUrl = `${window.location.pathname}?${params.toString()}`
  }
  window.history.replaceState(
    {},
    'CRM CC HandlingTechId to URL',
    newUrl
  )
}
