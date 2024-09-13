import {
  FC,
  lazy,
  Suspense,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  Button, Dropdown, Modal, Skeleton,
} from 'antd';
import { RcFile } from 'antd/lib/upload';
import { DownloadOutlined } from '@ant-design/icons';
import axios, { AxiosResponse } from 'axios';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import downloadFileFromBlob from '@t2crm/wfm-utils/lib/utils/downloadFileFromBlob';
import DownloadIcon from 'assets/icons/download.svg';
import {
  downloadSalesOfficesTemplate,
  downloadRecommendedEmployeesNumberTemplate,
  uploadOffices,
  uploadEmployeesRecommendedNumber,
} from 'utils/api/offices';
import './styles.less';

// @ts-ignore
const FileLoader = lazy(() => import('tele2_wfm_uilibraryapp/components/FileLoader'));

const className = cn('load-offices');

type Props = {
  reloadOffices: () => void;
};

type VisibleItemType = {
  key: string;
  label: string;
  uploadMethod: (files: FormData) => Promise<AxiosResponse<any, any>>;
  downloadMethod: () => Promise<AxiosResponse<Blob, any>>;
};

const LoadOffices: FC<Props> = ({ reloadOffices }) => {
  const [isDownloadingTemplate, setIsDownloadingTemplate] = useState<boolean>(false);

  const [visivleViewItem, setVisivleViewItem] = useState<VisibleItemType | null>(null);

  const [uploadFiles, setUploadFiles] = useState<File[]>([]);

  const [isUploadingFiles, setIsUploadingFiles] = useState<boolean>(false);

  const loadHeaders = useMemo(() => ({
    Authorization: axios.defaults.headers.common.Authorization,
  }), []);

  const viewItems: VisibleItemType[] = [
    {
      key: 'file_load_sales_offices',
      label: 'Загрузка офисов продаж',
      uploadMethod: uploadOffices,
      downloadMethod: downloadSalesOfficesTemplate,
    },
    {
      key: 'file_load_recommended_employees_number',
      label: 'Загрузка рекомендованного количества сотрудников',
      uploadMethod: uploadEmployeesRecommendedNumber,
      downloadMethod: downloadRecommendedEmployeesNumberTemplate,
    },
  ];

  const handleDownloadTemplate = (downloadMethod: () => Promise<AxiosResponse<Blob, any>>) => {
    setIsDownloadingTemplate(true);

    downloadMethod()
      .then((response) => {
        downloadFileFromBlob(response);
      })
      .finally(() => {
        setIsDownloadingTemplate(false);
      });
  };

  const onCancel = () => {
    setUploadFiles([]);
    setVisivleViewItem(null);
  };

  const handleSendFiles = useCallback((uploadMethod) => {
    const formData = new FormData();
    formData.append('file', uploadFiles[0]);
    setIsUploadingFiles(true);
    uploadMethod(formData)
      .then(() => {
        reloadOffices();
        onCancel();
      })
      .finally(() => {
        setIsUploadingFiles(false);
      });
  }, [uploadFiles, reloadOffices]);

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
    <>
      <Dropdown
        placement="bottom"
        arrow={{ pointAtCenter: true }}
        className={className()}
        menu={{
          items: viewItems.map((item) => ({
            key: item.key,
            label: (
              <div
                role="none"
                onClick={() => setVisivleViewItem(item)}
              >
                {item.label}
              </div>
            ),
          })),
        }}
      >
        <div className={className('icon')}>
          <DownloadIcon />
        </div>
      </Dropdown>
      {visivleViewItem && (
        <Modal
          destroyOnClose
          title={visivleViewItem.label}
          open={!!visivleViewItem}
          onCancel={() => setVisivleViewItem(null)}
          footer={[
            <Button
              type="default"
              onClick={() => handleDownloadTemplate(visivleViewItem.downloadMethod)}
              key="download-template"
              loading={isDownloadingTemplate}
              icon={<DownloadOutlined />}
            >
              Скачать шаблон
            </Button>,
            <Button
              type="primary"
              disabled={!uploadFiles.length}
              loading={isUploadingFiles}
              onClick={() => handleSendFiles(visivleViewItem.uploadMethod)}
              key="action"
            >
              Загрузить
            </Button>,
          ]}
        >
          <Suspense fallback={<Skeleton.Input active block style={{ height: 200 }} />}>
            <FileLoader
              types="tables"
              modal={false}
              multiple={false}
              method="put"
              title={visivleViewItem.label}
              headers={loadHeaders}
              beforeUpload={handleUploadFiles}
              onRemove={handleRemoveFiles}
              fileList={uploadFiles}
            />
          </Suspense>
        </Modal>
      )}
    </>
  );
};

export default LoadOffices;
