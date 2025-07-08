import {
	TypedUseSelectorHook,
	useDispatch,
	useSelector,
	useStore,
} from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from './store'
import { AppActions } from './types'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore = useStore<RootState>
export const useAppDispatch = useDispatch<
	ThunkDispatch<RootState, void, AppActions>
>
