import fromEnv from 'config/fromEnv'
import TorusGeocoder from './components/TorusGeocoder/torus-geocoder'

const smartGisPath = fromEnv('REACT_APP_SMART_GIS_DEFAULT')
const smartGisMapPath = fromEnv('REACT_APP_SMART_GIS_MAP')

export const torusGeocoderConfig = {
  serviceUrl: `${smartGisMapPath}/GetGeoObjectsByAddress`,
  reverseUrl: `${smartGisMapPath}/GetGeoObjectsByCoordinates`,
  getUrl: `${smartGisMapPath}/GetApiUrl`,
  nominatim: `${smartGisPath}/nominatim/`,
  wrapperId: 'torus-geocoder'
}

export const TorusGeocoderController = {
  get instance () {
    return new TorusGeocoder({
      id: torusGeocoderConfig.wrapperId,
      placeholder: 'Поиск по адресу',
      // displaySettings: true,
      providers: [
        'Coordinate',
        // provider OSM
        // ["Nominatim", { "serviceUrl": "https://torus-osm.corp.tele2.ru/nominatim/", "label": "OSM Tele2" }],
        // ["Nominatim", { "serviceUrl": "http://smartgis-osm.corp.tele2.ru/nominatim/", "label": "OSM Tele2" }],
        [
          'GwiYandex',
          {
            serviceUrl: torusGeocoderConfig.serviceUrl,
            reverseUrl: torusGeocoderConfig.reverseUrl,
            getUrl: torusGeocoderConfig.getUrl
          }
        ]
      ],
      tileLayer: {
        urlTemplate: 'https://{s}.torus-osm.corp.tele2.ru/osm_tiles/{z}/{x}/{y}.png',
        subdomains: ['ts0', 'ts1', 'ts2', 'ts3', 'ts4', 'ts5', 'ts6', 'ts7', 'ts8', 'ts9'],
        layerType: 'Yandex', // possible values: OSM, Yandex
        getUrlYandex: `${smartGisMapPath}/GetApiUrl`
        // urlTemplate: 'http://{s}.smartgis-osm.corp.tele2.ru/osm_tiles/{z}/{x}/{y}.png',
        // subdomains: ["a1","b1","c1","d1","e1","f1","g1","h1","i1","j1"]
        // urlTemplate: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        // subdomains: 'abc'
      }
    })
  }
}
