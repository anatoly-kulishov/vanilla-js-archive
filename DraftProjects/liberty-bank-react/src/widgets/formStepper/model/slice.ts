import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormStepperSliceState } from './types';

const initialState: FormStepperSliceState = {
  isTabLabelShown: true,
};

export const formStepperSlice = createSlice({
  name: 'formStepperSlice',
  initialState,
  reducers: {
    addToStepperState: (state, action: PayloadAction<FormStepperSliceState>) => ({
      ...state,
      ...action.payload,
    }),
    resetStepper: () => initialState,
    toggleTabLabel: (
      state,
      action: PayloadAction<Pick<FormStepperSliceState, 'isTabLabelShown'>>,
    ) => ({
      ...state,
      isTabLabelShown: action.payload.isTabLabelShown,
    }),
  },
});

export const { addToStepperState, resetStepper, toggleTabLabel } = formStepperSlice.actions;
export const formStepper = formStepperSlice.reducer;
