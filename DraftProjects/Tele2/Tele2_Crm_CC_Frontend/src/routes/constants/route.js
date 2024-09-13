/**
 * Обхект для определения положения в меню
 * @param {boolean} isMenu Находится ли в меняю
 * @param {?boolean} isExtra Находится ли во подмню "Прочее"
 * @param {string} subheader Дополнительный путь (например, для финансов - вкладка "Балансы", /balance)
 * @param {string} clientSubheader Дополнительный путь (например, для финансов - вкладка "Балансы", /balance) для cardMode === client
 */
export function Menu (inMenu, isExtra, subheader, clientSubheader) {
  this.inMenu = inMenu
  this.isExtra = isExtra
  this.subheader = subheader
  this.clientSubheader = clientSubheader
}

/**
 * Объект routes приложения
 * @param {string} text Отображаемое в меню название
 * @param {string} path Путь компонента
 * @param {string[]} layouts Layouts, в которых будет доступен этот компонент
 * @param {numbers[]} cardModes Режимы работы картчоки (абонент, клиент, анонимный и т. д.), в которых будет доступен этот компонент
 * @param {menu} menu Объект для определения положения в навигационном меню
 * @param {string[]} permissions Необходимые разрешения
 * @param {import("react").ReactNode} component Компонент для отображения
 * @param {boolean} conditionals Масив условий для отображения роута
 */
export function Route (text, path, layouts, cardModes, menu, permissions, component, conditionals = []) {
  this.text = text
  this.path = path
  this.layouts = layouts
  this.cardModes = cardModes
  this.menu = menu
  this.permissions = permissions
  this.component = component
  this.conditionals = conditionals
}
