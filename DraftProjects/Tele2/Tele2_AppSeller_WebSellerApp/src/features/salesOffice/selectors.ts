import { State } from 'helpers/store/state';

const selectActiveSalesOfficeId = (state: State) =>
  state.webseller.salesOffice.activeSalesOffice?.salesOfficeId;
const selectStepChangingSalesOffice = (state: State) => state.webseller.salesOffice.activeStep;
const selectPotentialActiveSalesOfficeInfo = (state: State) =>
  state.webseller.salesOffice.potentialActiveSalesOfficeInfo;
const selectIsLoadingGetPotentialActiveSalesOffice = (state: State) =>
  state.webseller.salesOffice.isLoadingGetPotentialActiveSalesOffice;
const selectIsLoadingChangeActiveSalesOffice = (state: State) =>
  state.webseller.salesOffice.isLoadingChangeActiveSalesOffice;
const selectStatusChangeActiveSalesOffice = (state: State) =>
  state.webseller.salesOffice.statusChangingOffice;
const selectErrorChangeActiveSalesOffice = (state: State) =>
  state.webseller.salesOffice.errorChangeActiveSalesOffice;

const selectorsSalesOffice = {
  selectActiveSalesOfficeId,
  selectStepChangingSalesOffice,
  selectPotentialActiveSalesOfficeInfo,
  selectIsLoadingGetPotentialActiveSalesOffice,
  selectIsLoadingChangeActiveSalesOffice,
  selectStatusChangeActiveSalesOffice,
  selectErrorChangeActiveSalesOffice
};

export default selectorsSalesOffice;
