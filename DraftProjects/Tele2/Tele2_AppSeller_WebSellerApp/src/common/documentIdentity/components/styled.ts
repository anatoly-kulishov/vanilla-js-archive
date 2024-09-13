import styled from 'styled-components';
import { DatePicker } from 'uiKit';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  text-align: center;
`;

const Main = styled.div`
  margin: 24px 0 0;
  flex: 1;
  display: flex;

  overflow-x: hidden;
  overflow-y: auto;

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

const RequiredLabel = styled.span`
  margin-right: 4px;
  color: red;
`;

const DatePickerStyled = styled(DatePicker)`
  width: 100%;
`;

const CardUFMS = styled.div`
  margin: 0 0 12px;
  padding: 6px 8px;
  font-family: T2_Rooftop_Regular, sans-serif;
  font-size: 12px;
  color: #47484d;
  cursor: pointer;
  background-color: #e9e8ee;
  border-radius: 12px;

  &:hover {
    background-color: #d9f5ff;
  }
`;

const FormStepWrapper = styled.div<{ isActive: boolean }>`
  display: ${({ isActive }) => (isActive ? 'inherit' : 'none')};
`;

const RegistrationAddressButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const styledDocumentIdentity = {
  Container,
  Main,
  RequiredLabel,
  DatePickerStyled,
  CardUFMS,
  FormStepWrapper,
  RegistrationAddressButtonWrapper
};

export default styledDocumentIdentity;
