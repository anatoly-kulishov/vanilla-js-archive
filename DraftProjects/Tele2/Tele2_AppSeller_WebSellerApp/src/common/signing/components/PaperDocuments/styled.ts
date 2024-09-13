import styled from 'styled-components';

// TODO убрать, height/width/max-width решать на уровне степера
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  height: 100%;
  width: 60%;
  max-width: 600px;
`;

export const Main = styled.div`
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

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 100%;
  width: 100%;
`;

export const Documents = styled.div``;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
