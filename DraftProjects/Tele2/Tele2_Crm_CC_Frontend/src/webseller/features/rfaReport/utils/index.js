export const reformatToOptions = (arr, obj) => {
  const objLabel = obj.label
  const objValue = obj.value

  return arr?.map(el => {
    return {
      label: el[objValue] + ' ' + el[objLabel],
      value: el[objValue].toString()
    }
  }) || []
}
