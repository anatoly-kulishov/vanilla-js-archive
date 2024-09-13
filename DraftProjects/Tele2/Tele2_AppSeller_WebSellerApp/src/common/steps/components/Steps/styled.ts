import styled from 'styled-components';

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
`;

const StepWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0px;
  width: 100%;
  padding: 32px;
  border-radius: 16px;
  border: 1px dashed #44caff;
`;

const StepContent = styled.div<{ width: string }>`
  width: ${({ width }) => width};
`;

const styledSteps = {
  ModalContent,
  StepWrapper,
  StepContent
};

export default styledSteps;
