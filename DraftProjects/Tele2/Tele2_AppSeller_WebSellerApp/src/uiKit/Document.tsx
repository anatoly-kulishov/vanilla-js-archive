import { FC } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { downloadFile, Target } from 'helpers/downloadFile';
import Title from './Title';

type Props = {
  url: string;
  title: string;
  linkTarget?: Target;
};

const Document: FC<Props> = ({ url, title, linkTarget }) => {
  const openDocument = (evt) => {
    const { url, filename } = evt.currentTarget.dataset;
    downloadFile(url, `${filename}.pdf`, linkTarget);
  };

  return (
    <Container key={url} data-url={url} data-filename={title} onClick={openDocument}>
      <Title bold fontSize={16}>
        {title}
      </Title>
      <Icon>
        <DownloadOutlined />
      </Icon>
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const Icon = styled.span`
  font-size: 24px;
`;

export default Document;
