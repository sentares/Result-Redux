import { applyMiddleware, combineReducers, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunkMiddleware from 'redux-thunk'
import { contactsReducer } from './contacts'
import { favoriteContactsReducer } from './favotire'
import { groupsReducer } from './groups'
import { logActionMiddleware } from './logActionMiddleware'

const rootReducer = persistReducer(
	{ key: 'redux', storage: storage, throttle: 100000 },
	combineReducers({
		contacts: contactsReducer,
		groups: groupsReducer,
		favoriteContacts: favoriteContactsReducer,
	})
)

export const store = createStore(
	rootReducer,
	applyMiddleware(thunkMiddleware, logActionMiddleware)
)

export const persistor = persistStore(store)

// @ts-ignore
window.persistor = persistor

export type RootState = ReturnType<typeof rootReducer>
