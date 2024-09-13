import styles from './fileDropzone.module.scss';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { Text, Icon } from '@/shared';
import { FC, useState, useId } from 'react';
import { FileChip } from './fileChip';
import classNames from 'classnames';
import filesCompare from './filesCompare';

interface Props {
  onChange?: (value: File[]) => void;
  label?: string;
  required?: boolean;
  subLabel?: string;
  name?: string;
  value?: File[];
  options?: DropzoneOptions;
  isError?: boolean;
  errorMessage?: string;
}

export const FileDropzone: FC<Props> = ({
  onChange,
  label,
  required,
  subLabel,
  value,
  name,
  options,
  isError = false,
}) => {
  const [files, setFiles] = useState<File[]>(value ? [...value] : []);
  const [isInitFiles, setIsInitFiles] = useState(Boolean(value?.length));

  const id = useId();

  const handleFileAccept = (filesArr: File[]) => {
    const acceptedFiles = filesArr.filter((f1) => !files.some((f2) => filesCompare(f1, f2)));
    onChange?.([...files, ...acceptedFiles]);
    setFiles((prev) => [...prev, ...acceptedFiles]);
    setIsInitFiles(!acceptedFiles.length);
  };

  const handleFileRemove = (_: React.MouseEvent<HTMLButtonElement>, file: File) => {
    const filteredFiles = files.filter((f) => {
      const name = f.name === file.name;
      const type = f.type === file.type;
      const size = f.size === file.size;
      return !(name && type && size);
    });
    setFiles(filteredFiles);
    onChange?.(filteredFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    ...options,
    ...(options?.onDropAccepted || { onDropAccepted: (files) => handleFileAccept(files) }),
  });

  return (
    <div className={styles['dropzone__container']}>
      {label && (
        <label
          className={classNames(styles['dropzone__label'], {
            [styles['dropzone__label_required']]: required,
          })}
          htmlFor={`${id}-files`}
        >
          <Text tag='span' size='s'>
            {label}
          </Text>
        </label>
      )}
      <div
        {...getRootProps({
          className: classNames(styles['dropzone'], { [styles['dropzone_error']]: isError }),
        })}
      >
        <input {...getInputProps({ name })} id={`${id}-files`} />
        <div className={styles['dropzone__button']}>
          <Icon icon={'upload'} {...{ color: isError ? '#f53c14' : '' }} />
          <Text tag='span' className={styles['dropzone__heading']}>
            Загрузить файл
          </Text>
        </div>
        <Text tag='p' size='xs'>
          {subLabel}
        </Text>
      </div>
      <ul className={styles['dropzone__filelist']}>
        {files.map((file) => {
          return (
            <FileChip
              file={file}
              onRemove={handleFileRemove}
              key={file.lastModified}
              preventUpload={isInitFiles}
            />
          );
        })}
      </ul>
    </div>
  );
};
