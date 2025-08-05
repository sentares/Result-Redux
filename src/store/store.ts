import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { contactsApiSlice, contactsSlice } from './contacts'
import { favoriteContactsApiSlice } from './favotire'
import { groupsApiSlice } from './groups'
import { logActionMiddleware } from './logActionMiddleware'

const rootReducer = persistReducer(
	{ key: 'redux', storage: storage, throttle: 100000 },
	combineReducers({
		contacts: contactsSlice.reducer,
		[contactsApiSlice.reducerPath]: contactsApiSlice.reducer,
		[groupsApiSlice.reducerPath]: groupsApiSlice.reducer,
		[favoriteContactsApiSlice.reducerPath]: favoriteContactsApiSlice.reducer,
	})
)

export const store = configureStore({
	reducer: rootReducer,
	devTools: true,
	middleware(getDefaultMiddleware) {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE],
			},
		}).concat([
			contactsApiSlice.middleware,
			groupsApiSlice.middleware,
			favoriteContactsApiSlice.middleware,
			logActionMiddleware,
		])
	},
})

export const persistor = persistStore(store)

// @ts-ignore
window.persistor = persistor

export type RootState = ReturnType<typeof rootReducer>
