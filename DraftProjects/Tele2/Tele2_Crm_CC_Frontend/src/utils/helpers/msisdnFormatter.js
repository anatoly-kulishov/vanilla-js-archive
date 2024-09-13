export default function msisdnFormatter (msisdn) {
  let msisdnStr = msisdn
  if (typeof msisdnStr === 'number') msisdnStr = msisdnStr.toString()
  if (typeof msisdnStr !== 'string') return msisdnStr
  const mask = '+7 (999) 999-99-99'
  const maskString = []
  let iter = 1

  mask.split('').forEach((val) => {
    if (msisdnStr.length < iter) return
    if (val !== '9') {
      maskString.push(val)
      return
    }
    maskString.push(msisdnStr[iter])
    ++iter
  })

  return maskString.join('')
}
