export const setDotColor = status => {
  switch (status) {
    case 1:
      return '#52C41A'
    case 2:
      return '#F5222D'
    case 3:
      return 'black'
    case 4:
      return '#FFDE03'
    case 0:
      return '#bbb'
    default:
      return 'white'
  }
}

export const setClsColor = (clsCheck, type) => {
  switch (clsCheck) {
    case 0:
      return 'green'
    case 1:
      if (type === 'phone') {
        return 'orange'
      } else {
        return 'green'
      }
    case 2:
      if (type === 'phone') {
        return 'green'
      } else {
        return 'orange'
      }
    case 3:
      return 'orange'
    case 4:
      return '#8ceded'
    case -1000:
      return 'black'
    default:
      return 'grey'
  }
}
