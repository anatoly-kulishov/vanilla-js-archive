const WORD = ['doc', 'docx', 'odt'] // icon file-word
const JSON = ['json'] // icon file-json
const EXCEL = ['xls', 'xlsx', 'ods'] // file-excel
const PDF = ['pdf'] // icon file-pdf
const TEXT = ['txt', 'rtf'] // icon file-text
const IMAGES = ['jpeg', 'gif', 'bmp', 'png', 'webp', 'svg', 'jpg'] // icon picture
const AUDIO = ['wav', 'flac', 'wma', 'mp3', 'aac'] // icon sound
const VIDEO = ['webm', 'flv', 'avi', 'mov', 'wmv', 'amv', 'mp4', 'mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'mpg', 'mpeg', 'm2v', 'm4v', '3gp', '3g2'] // icon video-camera
// icon file-unknown

export function getFileIcon (ext) {
  if (WORD.includes(ext)) return 'file-word'
  if (EXCEL.includes(ext)) return 'file-excel'
  if (PDF.includes(ext)) return 'file-pdf'
  if (TEXT.includes(ext)) return 'file-text'
  if (IMAGES.includes(ext)) return 'picture'
  if (AUDIO.includes(ext)) return 'sound'
  if (VIDEO.includes(ext)) return 'video-camera'
  if (JSON.includes(ext)) return 'container'

  return 'file-unknown'
}

export function getFileExtension (filename) {
  return filename.split('.').pop()
}

export const snakeToCamelCase = (string) => {
  return string.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '')
  })
}

export const pascalToCamelCase = string => {
  return string
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

export const filterObjectByKey = (object, query) => (
  Object.keys(object)
    .reduce((newObj, key) =>
      key !== query
        ? { ...newObj, [key]: object[key] }
        : newObj,
    {})
)

export const extensionToMime = (extension) => {
  const mapping = {
    'png': 'image/png',
    'tiff': 'image/tiff',
    'jpg': 'image/jpg',
    'jpeg': 'image/jpeg',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'pdf': 'application/pdf'
  }

  return mapping[extension]
}
