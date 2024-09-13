export const TariffTypes = {
  Tariff: 'tariff',
  BroadbandDevice: 'broadbandDevice',
  BroadbandAccess: 'broadbandAccess',
  Sim: 'sim',
  Wink: 'wink',
  WinkTV: 'winkTv'
}

export const initialWink = {
  ServiceId: null,
  ServiceType: TariffTypes.Wink,
  RtcCode: null,
  ServiceName: 'WINK-оборудование',
  ServicePrice: null
}

export const initialSim = {
  ServiceId: null,
  ServiceType: TariffTypes.Sim,
  RtcCode: null,
  ServiceName: 'SIM-карта',
  ServicePrice: null
}
