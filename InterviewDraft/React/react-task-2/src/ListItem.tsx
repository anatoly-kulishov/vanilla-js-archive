import {memo, useEffect, useRef} from "react";

interface IListItem {
  index: number,
  item: {
    id: number;
    label: string;
    value: number;
  },
  onUpdate: (index: number) => void
  onDelete: (index: number) => void
}

function ListItem({ index, item, onUpdate, onDelete  }: IListItem) {
  const newRenderCount = useRef(0);

  // TODO(2.1 перенес счетчик в useEffect)
  useEffect(() => {
    newRenderCount.current += 1;
  });

  const handleUpdateClick = () => {
    onUpdate(index);
  };

  const handleDeleteClick = () => {
    onDelete(item.id);
  };

  return (
      <li>
        {item.label}: {item.value} (renders: {newRenderCount.current})
        <button onClick={handleUpdateClick}>Update</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </li>
  );
}

export default memo(ListItem);