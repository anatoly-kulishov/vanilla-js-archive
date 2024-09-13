import { arrayOf, bool, number, shape, string } from 'prop-types'

const mnpScanFilePropType = shape({
  base64content: string,
  extension: string,
  imagePathId: number,
  isRecognized: bool,
  name: string,
  pageNumber: number
})

export default arrayOf(mnpScanFilePropType)
