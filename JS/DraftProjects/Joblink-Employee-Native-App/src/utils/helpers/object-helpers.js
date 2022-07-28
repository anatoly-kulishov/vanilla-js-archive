export const updateObjectArray = (items, itemId, objPropName, newObjProps) => {
    items.map((item) => {
        if (item[objPropName] === itemId) {
            return {...item, newObjProps: !item.newObjProps}
        }
        return item;
    })
}