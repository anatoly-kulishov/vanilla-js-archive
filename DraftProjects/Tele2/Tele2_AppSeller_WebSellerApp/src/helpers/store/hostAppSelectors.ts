import { State } from './state';
import { HostState } from './hostAppSelectors.types';

export const selectHandlingId = (state: State) =>
  state?.internal?.handlingState?.Id as HostState.Internal.HandlingId | undefined;
export const selectPersonalAccount = (state) =>
  state?.personalInfo?.personalAccountState
    ?.personalAccount as HostState.PersonalInfo.PersonalAccountState.PersonalAccount | null;
