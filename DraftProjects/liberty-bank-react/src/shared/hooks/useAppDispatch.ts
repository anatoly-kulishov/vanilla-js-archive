import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/appStore.ts';

export const useAppDispatch = () => useDispatch<AppDispatch>();
