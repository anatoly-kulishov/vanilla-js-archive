export const initialDiagnosticsState = {
  currentLocation: {
    latitude: '',
    longitude: '',
    address: '',
    deviation: null
  },
  searchInputValue: '',
  flags: {
    hasNewParameters: false,
    locationSearchType: null
  },
  deviationInfo: {
    deviation: null,
    deviationLevel: null
  }
}
/**
 * Location interaction types.
 * @param {String} byMapClick - Search location by clicking on the map.
 * @param {String} byPhoneNumber - Find coordinates by external means and update map widget them.
 * @param {String} byManualSearch - Type into the location search bar and choose from the list below.
 * @param {String} byLocationHistory - Choose from the previous locations.
 */
export const diagnosticsLocationSearchTypes = {
  byMapClick: 'POINT_ON_MAP',
  byPhoneNumber: 'SIMULATE_CLICK',
  byManualSearch: 'CHOOSE_FROM_LIST',
  byLocationHistory: 'SELECT_PREVIOUS',
  byInitialValue: 'INITIAL_VALUE'
}

export const smartGisWidgetEvents = {
  clickOnMap: 'geocoder-reverse-results',
  selectSuggestion: 'geocoder-result'
}
