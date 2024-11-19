// Нужно написать функцию, которая бы принимала на вход массив строк
// и вставляла в него, привязываясь к конкретной строке, одну
// или несколько новых
// Функция должна уметь вставлять как до конкретной строки, так и после

const injectIntoArray = (
    colList, cols
    // colList: Array<string>,
    // cols: Array<{
    //     data: string[];
    //     target: string;
    //     isAfter: boolean;
    // }>
) => {
    for (let i = 0; i < cols.length; i++) {
        const {data, target, isAfter} = cols[i];
        const targetIndex = colList.indexOf(target);

        if (targetIndex !== -1) {
            const insertIndex = isAfter ? targetIndex : targetIndex - 1;
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