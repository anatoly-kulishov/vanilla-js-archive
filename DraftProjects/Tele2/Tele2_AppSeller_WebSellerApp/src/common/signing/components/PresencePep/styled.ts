import styled from 'styled-components';

type ButtonsContainerProps = {
  hasBackBtn: boolean;
};

// TODO убрать, height/width/max-width решать на уровне степера
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  height: 100%;
  width: 60%;
  max-width: 600px;
`;

export const ButtonsContainer = styled.div<ButtonsContainerProps>`
  display: flex;
  align-items: center;
  justify-content: ${({ hasBackBtn }) => (hasBackBtn ? 'space-between' : 'flex-end')};
`;

export const MainButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;
