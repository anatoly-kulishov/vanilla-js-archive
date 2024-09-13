import {
  FC,
  lazy,
  useCallback,
  useState,
} from 'react';
import { Button, Card } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';
import Uploads from 'types/response/uploads';
import { uploadStatisticData } from 'utils/api/uploads';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import ErrorJournalTable from './ErrorJournalTable';
import './styles.less';

const className = cn('upload-statistic-data-page');

// @ts-ignore
const FileLoader = lazy(() => import('tele2_wfm_uilibraryapp/components/FileLoader'));

const filePathByDefault = 'C:/users/user/file.xlsx';

const UploadStatisticDataPage: FC = () => {
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [isUploadingData, setIsUploadingData] = useState<boolean>(false);
  const [errors, setErrors] = useState<Uploads.StatisticDataError[]>([]);

  const handleUploadFiles = useCallback((file: File, files: File[]) => {
    setUploadFiles([...files]);

    return false;
  }, []);

  const handleRemoveFiles = useCallback((file: RcFile) => {
    const index = uploadFiles.indexOf(file);
    const newFileList = uploadFiles.slice();

    newFileList.splice(index, 1);
    setUploadFiles(newFileList);
  }, [uploadFiles]);

  const handleSendFiles = useCallback(() => {
    const formData = new FormData();

    formData.append('File', uploadFiles[0]);
    formData.append('FilePath', uploadFiles[0].webkitRelativePath || filePathByDefault);

    setIsUploadingData(true);
    uploadStatisticData(formData)
      .then(({ data }) => {
        setErrors(data);
        setUploadFiles([]);
      })
      .finally(() => {
        setIsUploadingData(false);
      });
  }, [uploadFiles]);

  return (
    <div className={className()}>
      <div className={className('wrapper')}>
        <Card
          className={className('upload-card')}
          title="Загрузка статистических данных"
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
          <div className={className('upload-card-actions')}>
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
        <Card
          className={className('table-card')}
          title="Журнал ошибок"
        >
          <ErrorJournalTable
            loading={false}
            dataSource={errors}
          />
        </Card>
      </div>
    </div>
  );
};

export default UploadStatisticDataPage;
