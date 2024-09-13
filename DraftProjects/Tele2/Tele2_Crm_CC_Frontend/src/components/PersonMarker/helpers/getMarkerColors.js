import { markerTypes } from 'constants/markerTypes'

export const getMarkerBorderColor = markerType => {
  switch (markerType) {
    case markerTypes.MNPReturn:
    case markerTypes.MNPOutActive:
      return '#ff1f1f'
    case markerTypes.Upsale:
      return '#12ffff'
    case markerTypes.Eshop:
      return '#18ff03'
    case markerTypes.CLSUpgrade:
      return '#fbff00'
    case markerTypes.ClosedNumberReturn:
      return '#dd571c'
    default:
      return '#9e9e9e'
  }
}

export const getMarkerColor = markerType => {
  switch (markerType) {
    case markerTypes.MNPReturn:
    case markerTypes.MNPOutActive:
      return '#eb8a8a'
    case markerTypes.Upsale:
      return '#8ceded'
    case markerTypes.Eshop:
      return '#94ed8c'
    case markerTypes.CLSUpgrade:
      return '#e6e86b'
    case markerTypes.ClosedNumberReturn:
      return '#fda172'
    default:
      return '#d1d1d1'
  }
}
