import { TariffTypes } from 'constants/tariff'

export function parseSelectedTariff (selectedTariff) {
  return {
    Id: selectedTariff?.BillingRateId,
    Name: selectedTariff?.BillingRateName,
    TypeCode: 'tariff',
    TypeName: 'Тарифный план',
    Type: 'tariff',
    Cost: selectedTariff?.CostMonthWithTax,
    PaymentType: 'month',
    FirstPayment: selectedTariff?.СhangeTrplCost ?? null,
    TotalMonths: null,
    CostMonth: null,
    EquipmentId: null
  }
}

function parseService (service) {
  return {
    Id: service?.BillingServiceId,
    Name: service?.ServiceName,
    TypeCode: 'tariffPackage',
    TypeName: 'Тарифный план',
    Type: 'tariffPackage',
    Cost: service?.CostNextMonthWithTax,
    PaymentType: 'month',
    FirstPayment: service?.costFirstOnWithTax,
    TotalMonths: null,
    CostMonth: null,
    EquipmentId: null
  }
}

function prepareTariff (orderState, selectedTariff, servicesState, servicesData) {
  const tariff = []
  if (selectedTariff) {
    tariff.push(parseSelectedTariff(selectedTariff))
  }
  orderState.Agreement?.Tariff?.forEach(item => {
    if (
      [TariffTypes.BroadbandDevice, TariffTypes.BroadbandAccess, TariffTypes.Sim, TariffTypes.Wink].includes(item?.Type)
    ) {
      tariff.push(item)
    }
  })
  servicesData?.forEach(service => {
    const serviceId = service?.BillingServiceId
    if (serviceId in servicesState && servicesState[serviceId]) {
      tariff.push(parseService(service))
    }
  })
  return tariff
}

export function prepareAgreementStateChange (orderState, selectedTariff, servicesState, servicesData, totalCost) {
  return {
    ...orderState?.Agreement,
    Tariff: prepareTariff(orderState, selectedTariff, servicesState, servicesData),
    TotalCost: totalCost
  }
}

export function changeTariff (prevAgreement, selectedTariff) {
  if (!selectedTariff) {
    return prevAgreement
  }
  const newTariff = prevAgreement.Tariff?.filter(item => item?.Type !== 'tariff') ?? []
  newTariff.push(parseSelectedTariff(selectedTariff))
  return {
    ...prevAgreement,
    Tariff: newTariff
  }
}

export function getTariffItemByType (order, type) {
  return order?.Agreement?.Tariff?.find(item => item?.Type === type)
}

export function getTariffItemsByType (order, type) {
  return order?.Agreement?.Tariff?.filter(item => item?.Type === type)
}
