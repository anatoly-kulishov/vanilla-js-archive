import { FC } from 'react';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';

import { Title } from 'uiKit';

type Props = {
  title?: string;
  size?: number;
};

const Loader: FC<Props> = ({ title, size = 24 }) => {
  return (
    <Container>
      {title && (
        <Title bold fontSize={16}>
          {title}
        </Title>
      )}
      <LoadingOutlined style={{ fontSize: size }} />
    </Container>
  );
};

export default Loader;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100%;
  width: 100%;
`;
