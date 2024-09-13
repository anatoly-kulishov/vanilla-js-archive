import { createAction } from 'redux-actions';
import { StepChangingActiveSalesOffice } from 'features/salesOffice/helpers';

export enum ActionTypeSalesOffice {
  GET_ACTIVE_SALES_OFFICE = 'webseller/salesOffice/GET_ACTIVE_SALES_OFFICE',
  GET_ACTIVE_SALES_OFFICE_SUCCESS = 'webseller/salesOffice/GET_ACTIVE_SALES_OFFICE_SUCCESS',
  GET_ACTIVE_SALES_OFFICE_ERROR = 'webseller/salesOffice/GET_ACTIVE_SALES_OFFICE_ERROR',

  INIT_CHANGING_OFFICE = 'webseller/salesOffice/INIT_CHANGING_OFFICE',

  CHANGE_STEP = 'webseller/salesOffice/CHANGE_STEP',

  GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO = 'webseller/salesOffice/GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO',
  GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO_SUCCESS = 'webseller/salesOffice/GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO_SUCCESS',
  GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO_ERROR = 'webseller/salesOffice/GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO_ERROR',

  CHANGE_ACTIVE_SALES_OFFICE = 'webseller/salesOffice/CHANGE_ACTIVE_SALES_OFFICE',
  CHANGE_ACTIVE_SALES_OFFICE_SUCCESS = 'webseller/salesOffice/CHANGE_ACTIVE_SALES_OFFICE_SUCCESS',
  CHANGE_ACTIVE_SALES_OFFICE_ERROR = 'webseller/salesOffice/CHANGE_ACTIVE_SALES_OFFICE_ERROR',

  RESET_STATE = 'webseller/salesOffice/RESET_STATE'
}

// TODO типизировать
export namespace ActionPayloadSalesOffice {
  export type GetActiveSalesOfficeSuccess = any;

  export type ChangeStep = StepChangingActiveSalesOffice;

  export type GetPotentialActiveSalesOfficeInfo = {
    officeId: string;
  };
  export type GetPotentialActiveSalesOfficeInfoSuccess = any;
  export type GetPotentialActiveSalesOfficeInfoError = any;

  export type ChangeActiveSalesOffice = any;
  export type ChangeActiveSalesOfficeSuccess = any;
  export type ChangeActiveSalesOfficeError = any;
}

const actionsSalesOffice = {
  getActiveSalesOffice: createAction(ActionTypeSalesOffice.GET_ACTIVE_SALES_OFFICE),
  getActiveSalesOfficeSuccess: createAction<ActionPayloadSalesOffice.GetActiveSalesOfficeSuccess>(
    ActionTypeSalesOffice.GET_ACTIVE_SALES_OFFICE_SUCCESS
  ),
  getActiveSalesOfficeError: createAction(ActionTypeSalesOffice.GET_ACTIVE_SALES_OFFICE_ERROR),

  initChangingOffice: createAction(ActionTypeSalesOffice.INIT_CHANGING_OFFICE),

  changeStep: createAction<ActionPayloadSalesOffice.ChangeStep>(ActionTypeSalesOffice.CHANGE_STEP),

  getPotentialActiveSalesOfficeInfo:
    createAction<ActionPayloadSalesOffice.GetPotentialActiveSalesOfficeInfo>(
      ActionTypeSalesOffice.GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO
    ),
  getPotentialActiveSalesOfficeInfoSuccess:
    createAction<ActionPayloadSalesOffice.GetPotentialActiveSalesOfficeInfoSuccess>(
      ActionTypeSalesOffice.GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO_SUCCESS
    ),
  getPotentialActiveSalesOfficeInfoError:
    createAction<ActionPayloadSalesOffice.GetPotentialActiveSalesOfficeInfoError>(
      ActionTypeSalesOffice.GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO_ERROR
    ),

  changeActiveSalesOffice: createAction<ActionPayloadSalesOffice.ChangeActiveSalesOffice>(
    ActionTypeSalesOffice.CHANGE_ACTIVE_SALES_OFFICE
  ),
  changeActiveSalesOfficeSuccess:
    createAction<ActionPayloadSalesOffice.ChangeActiveSalesOfficeSuccess>(
      ActionTypeSalesOffice.CHANGE_ACTIVE_SALES_OFFICE_SUCCESS
    ),
  changeActiveSalesOfficeError: createAction<ActionPayloadSalesOffice.ChangeActiveSalesOfficeError>(
    ActionTypeSalesOffice.CHANGE_ACTIVE_SALES_OFFICE_ERROR
  ),

  resetState: createAction(ActionTypeSalesOffice.RESET_STATE)
};

export namespace ActionSalesOffice {
  export type GetActiveSalesOffice = ReturnType<typeof actionsSalesOffice.getActiveSalesOffice>;
  export type GetActiveSalesOfficeSuccess = ReturnType<
    typeof actionsSalesOffice.getActiveSalesOfficeSuccess
  >;
  export type GetActiveSalesOfficeError = ReturnType<
    typeof actionsSalesOffice.getActiveSalesOfficeError
  >;

  export type InitChangingOffice = ReturnType<typeof actionsSalesOffice.initChangingOffice>;

  export type ChangeStep = ReturnType<typeof actionsSalesOffice.changeStep>;

  export type GetPotentialActiveSalesOfficeInfo = ReturnType<
    typeof actionsSalesOffice.getPotentialActiveSalesOfficeInfo
  >;
  export type GetPotentialActiveSalesOfficeInfoSuccess = ReturnType<
    typeof actionsSalesOffice.getPotentialActiveSalesOfficeInfoSuccess
  >;
  export type GetPotentialActiveSalesOfficeInfoError = ReturnType<
    typeof actionsSalesOffice.getPotentialActiveSalesOfficeInfoError
  >;

  export type ChangeActiveSalesOffice = ReturnType<
    typeof actionsSalesOffice.changeActiveSalesOffice
  >;
  export type ChangeActiveSalesOfficeSuccess = ReturnType<
    typeof actionsSalesOffice.changeActiveSalesOfficeSuccess
  >;
  export type ChangeActiveSalesOfficeError = ReturnType<
    typeof actionsSalesOffice.changeActiveSalesOfficeError
  >;

  export type ResetState = ReturnType<typeof actionsSalesOffice.resetState>;
}

export default actionsSalesOffice;
