/**
 * Необходимо реализовать функцию,
 * которая принимает на вход массив строк и вставляет в него одну или несколько строк,
 * привязываясь к существующим строкам в массиве.
 *
 * Вставка должна быть гибкой, с возможностью выбора места вставки — до или после указанной строки.
 */

const injectIntoArray = (colList, cols) => {
    for (let i = 0; i < cols.length; i++) {
        const {data, target, isAfter} = cols[i];
        const targetIndex = colList.indexOf(target);

        if (targetIndex !== -1) {
            const insertIndex = isAfter ? targetIndex + 1 : targetIndex;
            colList.splice(insertIndex, 0, ...data);
        } else {
            colList.push(...data);
        }
    }

    return colList;
};


const COLUMNS_LIST = [
    "date_from",
    "date_to",
    "fdc",
    "rdc",
    "schedule",
    "pur_group",
    "max_delay",
    "frequency",
    "store",

];

console.log(injectIntoArray(COLUMNS_LIST, [{data: ['data1', 'data2'], target: 'fdc', isAfter: true}]))