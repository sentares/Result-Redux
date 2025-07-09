import { ContactDto } from 'src/types/dto/ContactDto'
import {
	FavoriteContactsAction,
	FETCH_FAVORITE_CONTACTS_FAILURE,
	FETCH_FAVORITE_CONTACTS_START,
	FETCH_FAVORITE_CONTACTS_SUCCESS,
} from './actions'

interface FavoriteContactsState {
	loading: boolean
	error: string | null
	favoriteContactList: ContactDto[]
}

const initialState: FavoriteContactsState = {
	loading: false,
	error: null,
	favoriteContactList: [],
}

export function favoriteContactsReducer(
	state = initialState,
	action: FavoriteContactsAction
): FavoriteContactsState {
	switch (action.type) {
		case FETCH_FAVORITE_CONTACTS_START:
			return { ...state, loading: true, error: null }
		case FETCH_FAVORITE_CONTACTS_SUCCESS:
			return { ...state, loading: false, favoriteContactList: action.payload }
		case FETCH_FAVORITE_CONTACTS_FAILURE:
			return { ...state, loading: false, error: action.payload }
		default:
			return state
	}
}
