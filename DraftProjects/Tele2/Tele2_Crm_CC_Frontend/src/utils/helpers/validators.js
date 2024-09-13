export const validateInn = value => {
  let result = { isValid: false, error: null }
  if (typeof value === 'number') {
    value = value.toString()
  } else if (typeof value !== 'string') {
    value = ''
  }
  if (!value.length) {
    result.error = 'ИНН пуст'
  } else if (/[^0-9]/.test(value)) {
    result.error = 'ИНН может состоять только из цифр'
  } else if ([10, 12].indexOf(value.length) === -1) {
    result.error = 'ИНН может состоять только из 10 или 12 цифр'
  } else {
    let checkDigit = function (value, coefficients) {
      let sum = 0
      for (let coef in coefficients) {
        sum += coefficients[coef] * value[coef]
      }
      return parseInt(sum % 11 % 10)
    }
    switch (value.length) {
      case 10:
        let n10 = checkDigit(value, [2, 4, 10, 3, 5, 9, 4, 6, 8])
        if (n10 === parseInt(value[9])) {
          result.isValid = true
        }
        break
      case 12:
        let n11 = checkDigit(value, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8])
        let n12 = checkDigit(value, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8])
        if ((n11 === parseInt(value[10])) && (n12 === parseInt(value[11]))) {
          result.isValid = true
        }
        break
    }
    if (!result.isValid) {
      result.error = 'Неправильное контрольное число'
    }
  }
  return result
}
