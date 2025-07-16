import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { contactsApiSlice, contactsSlice } from './contacts'
import { favoriteContactsReducer } from './favotire'
import { groupsReducer } from './groups'
import { logActionMiddleware } from './logActionMiddleware'

const rootReducer = persistReducer(
	{ key: 'redux', storage: storage, throttle: 100000 },
	combineReducers({
		contacts: contactsSlice.reducer,
		groups: groupsReducer,
		favoriteContacts: favoriteContactsReducer,
		[contactsApiSlice.reducerPath]: contactsApiSlice.reducer,
	})
)

export const store = configureStore({
	reducer: rootReducer,
	devTools: true,
	middleware(getDefaultMiddleware) {
		return getDefaultMiddleware({
			serializableCheck: {
				// ignoredActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE],
			},
		}).concat([contactsApiSlice.middleware, logActionMiddleware])
	},
})

export const persistor = persistStore(store)

// @ts-ignore
window.persistor = persistor

export type RootState = ReturnType<typeof rootReducer>
