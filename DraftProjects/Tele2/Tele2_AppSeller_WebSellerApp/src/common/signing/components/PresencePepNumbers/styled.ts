import styled from 'styled-components';
import { Title } from 'uiKit';

// TODO убрать, height/width/max-width решать на уровне степера
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 60%;
  max-width: 600px;
`;

export const ContentEmpty = styled.div`
  width: 60%;
  max-width: 600px;
`;

export const Main = styled.div`
  flex: 1;
  margin: 24px 0;
  overflow: auto;

  // TODO перенести в общие styles
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #dedede;
    border-radius: 100px;
  }
`;

export const TitleStyled = styled(Title)`
  margin-bottom: 24px;
`;

export const RadioGroupWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MainButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;
