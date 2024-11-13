import { useState, useCallback } from "react";

import ListItem from "./ListItem";

const initialState = Array.from({ length: 200 }).map((_, id) => ({
  id,
  label: `Item #${id + 1}`,
  value: Math.random(),
}));

interface IList {
  itemsCount: Number
}

export default function List({ itemsCount }: IList) {
  const [items, setItems] = useState(initialState);

  const handleUpdate = useCallback((index: number) => {
    setItems((currentItems) => {
      const item = currentItems[index];
      const newValue = Math.random();

      // Проверка на изменение значения
      if (item.value === newValue) {
        return currentItems; // Нет изменений, возвращаем текущий массив
      }

      // Обновляем только изменённый элемент
      const newItems = [...currentItems];
      newItems[index] = { ...item, value: newValue };
      return newItems;
    });
  }, []);

  const handleDelete = useCallback((id: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }, []);

  return (
    <>
      <ul>
        {/* TODO(2.2 Компонент был не замемоизирован + поменял key на item.id) */}
        {items.map((item, index) => (
          <ListItem
            key={item.id}
            index={index}
            item={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </>
  );
}
