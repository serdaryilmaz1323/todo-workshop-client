import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { RootStoreType } from '../store';

export const useTypeSelector: TypedUseSelectorHook<RootStoreType> = useReduxSelector;
