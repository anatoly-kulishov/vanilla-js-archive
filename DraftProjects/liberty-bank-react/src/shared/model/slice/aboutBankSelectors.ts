import type { RootState } from '../../../app/appStore';

export const getCurrentCity = (state: RootState) => state.aboutBank.currentCity;
