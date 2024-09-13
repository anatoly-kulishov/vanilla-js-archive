import {
  FC, lazy, useCallback, useState,
} from 'react';
import { Button, Card } from 'antd';
import { RcFile } from 'antd/lib/upload';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import Common from '@t2crm/wfm-utils/lib/types/common';
import { AxiosResponse } from 'axios';
import './styles.less';

const className = cn('upload-from-wd-page');

// @ts-ignore
const FileLoader = lazy(() => import('tele2_wfm_uilibraryapp/components/FileLoader'));

type Props = {
  title: string;
  uploadMethod: (params: Common.KeyValue) => Promise<AxiosResponse<any, any>>
};

const CardLoader: FC<Props> = ({ title, uploadMethod }) => {
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);

  const [isUploadingData, setIsUploadingData] = useState<boolean>(false);

  const handleSendFiles = useCallback(() => {
    const formData = new FormData();
    formData.append('file', uploadFiles[0]);
    setIsUploadingData(true);
    uploadMethod(formData)
      .then(() => {
        setUploadFiles([]);
      })
      .finally(() => {
        setIsUploadingData(false);
      });
  }, [uploadFiles, uploadMethod]);

  const handleRemoveFiles = useCallback((file: RcFile) => {
    const index = uploadFiles.indexOf(file);
    const newFileList = uploadFiles.slice();

    newFileList.splice(index, 1);
    setUploadFiles(newFileList);
  }, [uploadFiles]);

  const handleUploadFiles = useCallback((file: File, files: File[]) => {
    setUploadFiles([...files]);

    return false;
  }, []);

  return (
    <Card
      className={className('card-wrapper')}
      title={title}
    >
      <FileLoader
        className={className('upload-space')}
        types="tables"
        modal={false}
        multiple={false}
        method="post"
        beforeUpload={handleUploadFiles}
        onRemove={handleRemoveFiles}
        fileList={uploadFiles}
      />
      <div className={className('card-actions')}>
        <Button
          type="primary"
          disabled={!uploadFiles.length}
          loading={isUploadingData}
          onClick={handleSendFiles}
          key="action"
        >
          Загрузить
        </Button>
      </div>
    </Card>
  );
};

export default CardLoader;
