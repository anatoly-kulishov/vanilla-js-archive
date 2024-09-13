import { FC } from 'react';
import styled from 'styled-components';
import { Upload, UploadProps, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { acceptableUploadFormats } from 'helpers/mimeTypes';
import Title from './Title';
import { Api } from 'api/types';

type Props = {
  title?: string;
  accept?: string;
  maxCount: number;
  documents: Api.DocumentService.Model.SignedDocument[];
  addDocument: (file: Api.DocumentService.Model.SignedDocument) => void;
  removeDocument: (uid: string) => void;
};

const UploadDocuments: FC<Props> = ({
  title = 'Отсканируй и загрузи подписанные документы',
  accept = acceptableUploadFormats,
  maxCount,
  documents,
  addDocument,
  removeDocument
}) => {
  // TODO поправить типизацию или функцию
  const customRequest = ({ file, onSuccess, onError }) => {
    const isAlreadyAdded = documents.find(({ name }) => name === file.name);
    const isAllDocumentsUploaded = maxCount === documents?.length;
    if (!isAlreadyAdded && !isAllDocumentsUploaded) {
      addDocument(file);
      onSuccess();
      return;
    }
    if (isAlreadyAdded) {
      notification.error({
        message: 'Файл с таким именем уже был добавлен'
      });
    }
    if (isAllDocumentsUploaded) {
      notification.error({
        message: 'Необходимые файлы уже добавлены'
      });
    }
    onError();
  };

  const onRemove = (file) => {
    removeDocument(file.uid);
  };

  return (
    <div>
      <Upload.Dragger
        accept={accept}
        fileList={documents}
        customRequest={customRequest as UploadProps['customRequest']}
        onRemove={onRemove}
      >
        <Icon>
          <UploadOutlined />
        </Icon>
        <Title style={{ textAlign: 'center' }} fontSize={16}>
          {title}
        </Title>
      </Upload.Dragger>
    </div>
  );
};

const Icon = styled.span`
  font-size: 24px;
`;

export default UploadDocuments;
