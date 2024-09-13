import React from 'react'
import { string, object, func } from 'prop-types'
import internal from 'utils/api'

// This component needs for downloading small files with JWT auth without storing blob in Redux
// Component download file, save it in JS heap and on user's drive
export default function AuthenticatedFileLink ({ url, getParams, fileName, children }) {
  const { downloadFile } = internal

  async function handleAction () {
    let params = null
    if (typeof getParams === 'function') {
      params = getParams()
    }
    const { data, headers } = await downloadFile(url, params)

    const blob = await new Blob([data], { type: headers.contentType })
    const href = window.URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.download = fileName
    link.href = href

    document.body.appendChild(link)
    link.click()

    // Clean up
    window.URL.revokeObjectURL(url)
    document.body.removeChild(link)
  }

  return <a role='button' onClick={handleAction}>{children}</a>
}

AuthenticatedFileLink.propTypes = {
  url: string.isRequred,
  fileName: string.isRequred,
  children: object.isRequred,
  getParams: func
}
