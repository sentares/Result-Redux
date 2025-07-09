import { Middleware } from 'redux'
import { logAction } from 'src/helpers/metrics/logAction'
import { RootState } from './store'
import { AppActions } from './types'

export const logActionMiddleware: Middleware<{}, RootState> = storeAPI => {
	return function wrapDispatch(next) {
		return function handleAction(action: AppActions) {
			logAction(action)
			next(action)
		}
	}
}
