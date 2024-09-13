import styled from 'styled-components';

// TODO убрать, height/width/max-width решать на уровне степера
export const Container = styled.div`
  width: 60%;
  max-width: 600px;
`;

export const Main = styled.div`
  margin: 24px 0 0;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0 0;
`;

export const CodeButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;
