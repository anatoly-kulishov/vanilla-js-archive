import {
  StatusChangingActiveSalesOffice,
  StepChangingActiveSalesOffice
} from 'features/salesOffice/helpers';

// TODO типизировать
export type StateSalesOffice = {
  activeSalesOffice: any;
  isLoadingGetActiveSalesOffice: boolean;
  isErrorGetActiveSalesOffice: boolean;

  statusChangingOffice: StatusChangingActiveSalesOffice;
  activeStep: StepChangingActiveSalesOffice;

  potentialActiveSalesOfficeInfo: any;
  isLoadingGetPotentialActiveSalesOffice: boolean;
  errorGetPotentialActiveSalesOffice: any;

  isLoadingChangeActiveSalesOffice: boolean;
  errorChangeActiveSalesOffice: any;
};

const initialState: StateSalesOffice = {
  activeSalesOffice: null,
  isLoadingGetActiveSalesOffice: false,
  isErrorGetActiveSalesOffice: false,

  statusChangingOffice: StatusChangingActiveSalesOffice.NONE,
  activeStep: StepChangingActiveSalesOffice.NONE,

  potentialActiveSalesOfficeInfo: null,
  isLoadingGetPotentialActiveSalesOffice: false,
  errorGetPotentialActiveSalesOffice: null,

  isLoadingChangeActiveSalesOffice: false,
  errorChangeActiveSalesOffice: null
};

export default initialState;
