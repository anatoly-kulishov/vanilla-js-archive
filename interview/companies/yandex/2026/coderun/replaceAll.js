/**
 * Полифил String.prototype.replaceAll.
 * Платформа перед тестами удаляет нативный метод.
 *
 * - RegExp без g → TypeError
 * - объект с Symbol.replace → делегируем ему (как в спецификации)
 * - Symbol в search → TypeError при String(search)
 * - обычная строка → заменить все вхождения
 */
String.prototype.replaceAll = function (searchValue, replaceValue) {
    const str = String(this);

    const isRegexp =
        Object.prototype.toString.call(searchValue) === "[object RegExp]";

    // replaceAll требует global у RegExp
    if (isRegexp && !searchValue.global) {
        throw new TypeError(
            "String.prototype.replaceAll called with a non-global RegExp argument",
        );
    }

    // censor и RegExp имеют Symbol.replace — отдаём работу им
    if (
        searchValue != null &&
        typeof searchValue[Symbol.replace] === "function"
    ) {
        return searchValue[Symbol.replace](str, replaceValue);
    }

    // обычная строка (String(Symbol) → TypeError)
    const search = String(searchValue);
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return str.replace(new RegExp(escaped, "g"), replaceValue);
};
