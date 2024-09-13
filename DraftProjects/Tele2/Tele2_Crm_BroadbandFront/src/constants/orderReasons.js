const RescheduleReason = {
  /** По просьбе клиента, до выезда инсталлятора */
  ClientsRequestBeforeInstallerVisit: 20401,
  /** По просьбе клиента, с выездом инсталлятора */
  ClientsRequestWithInstallerVisit: 20402,
  /** По инициативе РТК на ранний срок */
  RTKToEarlyDate: 20403,
  /** Инсталлятор не успевает, сообщил в НПП */
  InstallerDoesNotHaveTimeReportedToNPP: 20404,
  /** Инсталлятор не пришел, в НПП не сообщил */
  NoInstallerVisitNoNPPReport: 20405,
  /** Проблемы с доступом к оборудованию РТК */
  ProblemsWithAccessToRTKEquipment: 20406,
  /** На адресе требуется устанить nRFS */
  NRFSMustBeInstalledAtAddress: 20407,
  /** Проблема с нарядом */
  ProblemWithWorkOrder: 20408,
  /** У клиента отсутствует оконечное оборудование/ розетка для подключения */
  ClientDoesNotHaveTerminalEquipmentForConnection: 20409,
  /** Отсутствие оконечного оборудования/материалов у инсталлятора */
  LackOfTerminalEquipmentOrMaterialsFromInstaller: 20410,
  /** Сложное подключение */
  ComplicatedConnection: 20411,
  /** Некорректное назначение на исполнителя */
  IncorrectAssignmentToPerformer: 20412,
  /** Неблагоприятные погодные условия */
  AdverseWeatherConditions: 20413,
  /** Отсутствие инструментов/спецтехники */
  LackOfToolsOrSpecialEquipment: 20414
}

const DeferredReason = {
  /** Требуется перезвонить клиенту в определенную дату/По просьбе клиента, до выезда инсталлятора */
  RecallClientOrClientsRequestBeforeInstallerVisit: 20415,
  /** По просьбе клиента, с выездом инсталлятора */
  ClientsRequestWithInstallerVisit: 20416,
  /** Инсталлятор не успевает, сообщил в НПП */
  InstallerDoesNotHaveTimeReportedToNPP: 20417,
  /** Инсталлятор не пришел, в НПП не сообщил */
  NoInstallerVisitNoNPPReport: 20418,
  /** По просьбе канала продаж */
  RequestOfSalesChannel: 20419,
  /** Проблемы с доступом к оборудованию РТК */
  ProblemsWithAccessToRTKEquipment: 20420,
  /** На адресе требуется устанить nRFS */
  NRFSMustBeInstalledAtAddress: 20421,
  /** Проблема с нарядом */
  ProblemWithWorkOrder: 20422,
  /** У клиента отсутствует оконечное оборудование/ розетка для подключения */
  ClientDoesNotHaveTerminalEquipmentForConnection: 20423,
  /** Отсутствие оконечного оборудования/материалов у инсталлятора */
  LackOfTerminalEquipmentOrMaterialsFromInstaller: 20424,
  /** Сложное подключение */
  ComplicatedConnection: 20425,
  /** Некорректное назначение на исполнителя */
  IncorrectAssignmentToPerformer: 20426,
  /** Неблагоприятные погодные условия */
  AdverseWeatherConditions: 20427,
  /** Отсутствие инструментов/спецтехники */
  LackOfToolsOrSpecialEquipment: 20428,
  /** Не дозвонились до клиента */
  FailedToReachClient: 20429,
  /** Нет доступного тайм-слота */
  NoTimeSlotAvailable: 20430,
  /** Заявка выполнена частично */
  PartialFulfillmentOfOrder: 20431,
  /** Основная ошибка */
  MajorError: 20432,
  /** Ошибка POC */
  POCError: 20433,
  /** Расхождение статусов */
  StatusDiscrepancy: 20499,
  /** Ошибка при взятии заказа в работу */
  TakingOrderToWorkError: 20434,
  /** Не найдено забронированное окно */
  NotFoundReservedWindow: 20435
}

const RefusedReason = {
  /** Выбрал другого провайдера */
  ChosenAnotherProvider: 9906,
  /** Решил остаться на своем провайдере */
  DecidedToStayWithCurrentProvider: 9907,
  /** Услугу не заказывал */
  DidntOrderService: 9937,
  /** Нет связи с клиентом */
  NoCommunicationWithClient: 9927,
  /** Не устроили условия монтажа линии и/или оборудования/Запрет монтажа/отсутствует бесплатная настройка */
  InstallationConditionsNotSatisfiedOrProhibited: 9928,
  /** Неверно проинформирован по услугам, тарифам, технологиям */
  WronglyInformed: 9929,
  /** Длительный срок подключения */
  LongConnectionTime: 9930,
  /** Отказ от строительства линии */
  RefusalToBuildLine: 9938,
  /** Без объяснения причин (Категорический отказ переименовать) */
  WithoutExplanation: 9931,
  /** Нежилое помещение */
  NonResidentialPremises: 9932,
  /** Квартира съемная - собственник против (Квартира съемная - собственник против; подключение не согласовано с другими членами семьи) */
  OwnerIsAgainst: 9933,
  /** Параметры клиента не удовлетворяют условиям акции */
  ClientParametersDontMeetPromotionConditions: 9934,
  /** nRFS */
  NRFS: 9935,
  /** Недостаточная пропускная способность линии */
  InsufficientLineCapacity: 9936,
  /** Нет технической возможности подключения */
  NoTechnicalConnectivity: 9908,
  /** Плохое качество услуги при демонстрации */
  PoorServiceQualityDuringDemonstration: 9909,
  /** Отсутствие оконечного оборудования Ростелеком */
  LackOfRTKTerminalEquipment: 9910,
  /** Нет доступа к оборудованию РТК */
  NoAccessToRTKEquipment: 9911,
  /** Претензии по качеству работы и обслуживания инсталлятора */
  QualityOfWorkAndServiceClaims: 9912,
  /** Существующий абонент */
  Subscriber: 9913,
  /** Отказ по причине отсутствия Стартового платежа */
  RefusalDueToLackOfInitialPayment: 9939,
  /** Негативные отзывы о компании/ опыт коллег, знакомых, родных */
  NegativeReviewsAboutCompany: 9914,
  /** Не устраивает стоимость тарифного плана/оборудования  */
  NotSatisfiedWithCost: 9915,
  /** Длительный отъезд/командировка/болезнь. Подаст заявку позднее. */
  LongDepartureOrBusinessTripOrIllness: 9916,
  /** Не устраивает предложенная технология подключения */
  NotSatisfiedWithProposedTechnology: 9917,
  /** Превышена максимальная сумма рассрочек */
  MaximumInstallmentAmountExceeded: 9918,
  /** Не согласен менять ТП Социальный интернте/снимать Добровольную блокировку */
  DoesntAgreeToChangeBlockFactors: 9940,
  /** Дебиторская задолженность */
  AccountsReceivable: 9919,
  /** Несовершеннолетний клиент */
  UnderageClient: 9920,
  /** У Клиента отсутствует орг. техника (телевизор, ПК, ноутбук и т.п.) */
  ClientDoesntHaveEquipment: 9921,
  /** Не согласен с инстал. платежом/годовым контрактом */
  DoesntAgreeWithPrice: 9941,
  /** Холодный ли */
  ColdLead: 9942,
  /** Техническая проблема */
  TechnicalProblem: 9943
}

const DuplicateReason = {
  /** Дубликат заявки от канала продаж */
  DuplicateRequestFromSalesChannel: 9944,
  /** Ошибка информационной системы */
  InformationSystemError: 9945
}

const InvalidReason = {
  /** Неверный номер телефона клиента/номер  не обслуживается */
  InvalidMsisdnOrNotInService: 9946,
  /** В заявке указан неверный адрес/другой регион */
  IncorrectAddressOrRegion: 9947
}

export const OrderReason = {
  /** Назначены дата и время инсталляции */
  InstallationAppointed: 401,
  /** Услуга подключена */
  ServiceIsActivated: 701,
  /** Требуется уточнение параметров заявки */
  RequiresClarificationOfApplicationParameters: 20436,
  /** Тестовая причина */
  Test: 9924,

  /** Перенос даты и времени инсталляции */
  RescheduleReason,
  /** Отложенная заявка */
  DeferredReason,
  /** Отказ */
  RefusedReason,
  /** Дубликат */
  DuplicateReason,
  /** Неверная заявка */
  InvalidReason
}

const swapKeysAndValues = dictionary =>
  Object.entries(dictionary).reduce((acc, [key, value]) => {
    acc[value] = key.toString()
    return acc
  }, {})

export const InversedRescheduleReason = swapKeysAndValues(RescheduleReason)
export const InversedDeferredReason = swapKeysAndValues(DeferredReason)
export const InversedRefusedReason = swapKeysAndValues(RefusedReason)
export const InversedDuplicateReason = swapKeysAndValues(DuplicateReason)
export const InversedInvalidReason = swapKeysAndValues(InvalidReason)
