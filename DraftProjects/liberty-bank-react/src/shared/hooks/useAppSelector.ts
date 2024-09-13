import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../../app/appStore.ts';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
