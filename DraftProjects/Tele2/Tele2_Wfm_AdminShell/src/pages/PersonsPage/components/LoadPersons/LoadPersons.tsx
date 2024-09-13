import {
  FC,
  lazy,
  Suspense,
  useMemo,
  useCallback,
  useState,
} from 'react';
import {
  Button,
  Skeleton,
  Modal,
  Input,
  Typography,
} from 'antd';
import type { RcFile } from 'antd/es/upload/interface';
import { DefaultOptionType } from 'antd/lib/select';
import { DownloadOutlined } from '@ant-design/icons';
import { useQueryClient } from 'react-query';

import cn from '@t2crm/wfm-utils/lib/utils/cn';
import validateEmail from '@t2crm/wfm-utils/lib/utils/validateEmail';
import { downloadTemplate, uploadPersons } from 'utils/api/persons';
import downloadFileFromBlob from '@t2crm/wfm-utils/lib/utils/downloadFileFromBlob';
import PartnerSelect from 'components/PartnerSelect';

import './styles.less';

const { Text, Paragraph } = Typography;

// @ts-ignore
const FileLoader = lazy(() => import('tele2_wfm_uilibraryapp/components/FileLoader'));

const className = cn('persons-load-person');

const LoadPersons: FC = () => {
  const queryClient = useQueryClient();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [activePartnerId, setActivePartnerId] = useState<number | undefined>(undefined);
  const [activePartnerName, setActivePartnerName] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [isDownloadingTemplate, setIsDownloadingTemplate] = useState<boolean>(false);
  const [isUploadingPersons, setIsUploadingPersons] = useState<boolean>(false);

  const disabledSendFiles = useMemo(() => (
    !activePartnerId || !uploadFiles.length || !email.length || !isValidEmail
  ), [activePartnerId, uploadFiles, email, isValidEmail]);

  const toggleModal = useCallback(() => setIsOpenModal((oldState) => !oldState), []);

  const handleClose = useCallback(() => {
    setIsOpenModal(false);
    setActivePartnerId(undefined);
    setActivePartnerName(undefined);
    setEmail('');
    setIsValidEmail(false);
    setUploadFiles([]);
  }, []);

  const handleUpdateEmail = useCallback((value: string) => {
    setEmail(value);
    setIsValidEmail(!!value && validateEmail(value));
  }, []);

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

  const openInfoModal = useCallback(() => {
    Modal.info({
      title: 'Данные загружены для обработки',
      content: (
        <Paragraph>
          {`Результаты загрузки данных мы отправим вам на почту ${email}`}
        </Paragraph>
      ),
      okText: 'Понятно',
    });
  }, [email]);

  const handleSendFiles = useCallback(() => {
    const formData = new FormData();

    formData.append('file', uploadFiles[0]);
    formData.append('partnerId', activePartnerId?.toString() ?? '');
    formData.append('partnerName', activePartnerName ?? '');
    formData.append('reportMail', email || '');

    setIsUploadingPersons(true);
    uploadPersons(formData)
      .then(() => {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'persons',
        });

        handleClose();
        openInfoModal();
      })
      .finally(() => {
        setIsUploadingPersons(false);
      });
  }, [
    uploadFiles,
    activePartnerId,
    activePartnerName,
    email,
    queryClient,
    handleClose,
    openInfoModal,
  ]);

  const handleDownloadTemplate = () => {
    setIsDownloadingTemplate(true);

    downloadTemplate()
      .then((response) => {
        downloadFileFromBlob(response);
      })
      .finally(() => {
        setIsDownloadingTemplate(false);
      });
  };

  return (
    <div className={className()}>
      <Button onClick={toggleModal}>Загрузить пользователей</Button>
      <Modal
        destroyOnClose
        title={(
          <PartnerSelect
            placeholder="Выберите партнера..."
            onChange={(value, option) => {
              setActivePartnerId(+value);
              setActivePartnerName(String((option as DefaultOptionType)?.children)?.split(',')?.[1]?.trim());
            }}
            style={{ width: 300 }}
            value={activePartnerId}
          />
        )}
        open={isOpenModal}
        onCancel={handleClose}
        footer={[
          <Button
            type="default"
            onClick={handleDownloadTemplate}
            key="download-template"
            loading={isDownloadingTemplate}
            icon={<DownloadOutlined />}
          >
            Скачать шаблон
          </Button>,
          <Button
            type="primary"
            disabled={disabledSendFiles}
            loading={isUploadingPersons}
            onClick={handleSendFiles}
            key="action"
          >
            Загрузить
          </Button>,
        ]}
      >
        <div className={className('input-email')}>
          <Text type="secondary">Введите почту для отправки отчета успешности операции</Text>
          <Input
            value={email}
            onChange={(event) => handleUpdateEmail(event.target.value)}
            maxLength={255}
          />
        </div>
        <Suspense fallback={<Skeleton.Input active block style={{ height: 200 }} />}>
          <FileLoader
            types="tables"
            modal={false}
            multiple={false}
            method="post"
            beforeUpload={handleUploadFiles}
            onRemove={handleRemoveFiles}
            fileList={uploadFiles}
          />
        </Suspense>
      </Modal>
    </div>
  );
};

export default LoadPersons;
