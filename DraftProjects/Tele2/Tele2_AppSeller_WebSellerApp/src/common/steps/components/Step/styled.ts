import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  width: 100%;
`;

const Main = styled.div``;

const Footer = styled.div<{ hasGoForward: boolean; hasGoBack: boolean }>`
  display: flex;
  justify-content: ${({ hasGoForward, hasGoBack }) => {
    if (hasGoForward && hasGoBack) {
      return 'space-between';
    }
    if (hasGoForward) {
      return 'flex-end';
    }
    return 'flex-start';
  }};
  align-items: center;
`;

const styledStep = {
  Container,
  Main,
  Footer
};

export default styledStep;
