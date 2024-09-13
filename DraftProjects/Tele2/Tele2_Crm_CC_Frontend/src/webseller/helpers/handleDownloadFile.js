export const handleDownloadFile = (data, fileName) => {
  const href = window.URL.createObjectURL(data)

  const anchorElement = document.createElement('a')

  anchorElement.href = href
  anchorElement.download = fileName

  document.body.appendChild(anchorElement)
  anchorElement.click()

  document.body.removeChild(anchorElement)
  window.URL.revokeObjectURL(href)
}
