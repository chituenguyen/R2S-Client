import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

<<<<<<< Updated upstream
export const useAppDispatch = () => useDispatch<AppDispatch>();
=======
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
>>>>>>> Stashed changes
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;