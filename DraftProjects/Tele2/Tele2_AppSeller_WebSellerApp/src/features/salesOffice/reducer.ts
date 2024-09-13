import { handleActions } from 'redux-actions';
import { produce } from 'immer';

import {
  StatusChangingActiveSalesOffice,
  StepChangingActiveSalesOffice
} from 'features/salesOffice/helpers';
import { ActionTypeSalesOffice, ActionSalesOffice } from 'features/salesOffice/actions';
import initialState, { StateSalesOffice } from 'features/salesOffice/state';

const reducerSalesOffice = handleActions(
  {
    [ActionTypeSalesOffice.GET_ACTIVE_SALES_OFFICE]: produce((state: StateSalesOffice) => {
      state.isLoadingGetActiveSalesOffice = true;
      state.isErrorGetActiveSalesOffice = false;
    }),
    [ActionTypeSalesOffice.GET_ACTIVE_SALES_OFFICE_SUCCESS]: produce(
      (state: StateSalesOffice, { payload }: ActionSalesOffice.GetActiveSalesOffice) => {
        state.activeSalesOffice = payload;
        state.isLoadingGetActiveSalesOffice = false;
      }
    ),
    [ActionTypeSalesOffice.GET_ACTIVE_SALES_OFFICE_ERROR]: produce((state: StateSalesOffice) => {
      state.isLoadingGetActiveSalesOffice = false;
      state.isErrorGetActiveSalesOffice = true;
    }),

    [ActionTypeSalesOffice.INIT_CHANGING_OFFICE]: produce((state: StateSalesOffice) => {
      state.activeStep = StepChangingActiveSalesOffice.CHECK;
    }),

    [ActionTypeSalesOffice.CHANGE_STEP]: produce(
      (state: StateSalesOffice, { payload }: ActionSalesOffice.ChangeStep) => {
        state.activeStep = payload;
      }
    ),

    [ActionTypeSalesOffice.GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO]: produce(
      (state: StateSalesOffice) => {
        state.isLoadingGetPotentialActiveSalesOffice = true;
        state.errorGetPotentialActiveSalesOffice = null;
      }
    ),
    [ActionTypeSalesOffice.GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO_SUCCESS]: produce(
      (
        state: StateSalesOffice,
        { payload }: ActionSalesOffice.GetPotentialActiveSalesOfficeInfoSuccess
      ) => {
        state.isLoadingGetPotentialActiveSalesOffice = false;
        state.potentialActiveSalesOfficeInfo = payload;
        state.activeStep = StepChangingActiveSalesOffice.SUBMIT;
      }
    ),
    [ActionTypeSalesOffice.GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO_ERROR]: produce(
      (state: StateSalesOffice, { payload }: ActionSalesOffice.GetActiveSalesOfficeError) => {
        state.isLoadingGetPotentialActiveSalesOffice = false;
        state.errorGetPotentialActiveSalesOffice = payload;
      }
    ),

    [ActionTypeSalesOffice.CHANGE_ACTIVE_SALES_OFFICE]: produce((state: StateSalesOffice) => {
      state.isLoadingChangeActiveSalesOffice = true;
    }),
    [ActionTypeSalesOffice.CHANGE_ACTIVE_SALES_OFFICE_SUCCESS]: produce(
      (state: StateSalesOffice, { payload }: ActionSalesOffice.ChangeActiveSalesOfficeSuccess) => {
        state.activeSalesOffice = payload;
        state.isLoadingChangeActiveSalesOffice = false;
        state.activeStep = StepChangingActiveSalesOffice.RESULT;
        state.statusChangingOffice = StatusChangingActiveSalesOffice.SUCCESS;
      }
    ),
    [ActionTypeSalesOffice.CHANGE_ACTIVE_SALES_OFFICE_ERROR]: produce(
      (state: StateSalesOffice, { payload }: ActionSalesOffice.ChangeActiveSalesOfficeError) => {
        state.isLoadingChangeActiveSalesOffice = false;
        state.errorChangeActiveSalesOffice = payload;
        state.activeStep = StepChangingActiveSalesOffice.RESULT;
        state.statusChangingOffice = StatusChangingActiveSalesOffice.ERROR;
      }
    ),

    [ActionTypeSalesOffice.RESET_STATE]: produce((state: StateSalesOffice) => {
      state.potentialActiveSalesOfficeInfo = null;
      state.errorGetPotentialActiveSalesOffice = null;
      state.errorChangeActiveSalesOffice = null;
      state.activeStep = StepChangingActiveSalesOffice.NONE;
      state.statusChangingOffice = StatusChangingActiveSalesOffice.NONE;
    })
  },
  initialState
);

export default reducerSalesOffice;
