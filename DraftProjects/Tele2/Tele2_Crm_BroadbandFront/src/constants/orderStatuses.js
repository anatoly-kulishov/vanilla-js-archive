export const OrderStatuses = {
  /** Удалена */
  Deleted: -1,
  /** Черновик */
  Draft: 0,
  /** Новая заявка */
  New: 10,
  /** Ожидание */
  Waiting: 20,
  /** Передана в РТК */
  TransferredToRtc: 30,
  /** Ошибка при работе с заявкой РТК */
  ErrorWithRTC: 35,
  /** Принята в работу */
  InWork: 40,
  /** Назначен монтажник */
  InstallerAppointed: 50,
  /** Инсталляция выполнена */
  InstallationDone: 60,
  /** Отмена РТК */
  CancelledByRtc: 90,
  /** Отменена */
  Cancelled: 99,
  /** Закрыта */
  Closed: 100
}
