import { useEffect, useRef, useState } from 'react';
import { Text } from '..';
import styles from './TableInput.module.scss';

interface TableInputProps {
  value: string;
  inputLabel: string[];
}

export const TableInput = (props: TableInputProps) => {
  const { value, inputLabel } = props;

  const [isSizeSet, setIsSizeSet] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isSizeSet && inputRef.current) {
      inputRef.current.size = value.length || 1;
      setIsSizeSet(true);
    }
  }, [isSizeSet]);

  return (
    <div className={styles.container}>
      <Text tag='p' size='m' weight='medium'>
        <label>{inputLabel}</label>
      </Text>

      <div className={styles.input_container}>
        <input ref={inputRef} type='text' className={styles.input_value} value={value} />
      </div>
    </div>
  );
};
