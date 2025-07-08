import { ContactDto } from 'src/types/dto/ContactDto'
import {
	ContactsAction,
	FETCH_CONTACTS_FAILURE,
	FETCH_CONTACTS_START,
	FETCH_CONTACTS_SUCCESS,
	SET_CONTACTS_FILTER,
} from './actions'
import { FilterFormValues } from 'src/components/FilterForm'

interface ContactsState {
	loading: boolean
	error: string | null
	data: ContactDto[]
	filter: FilterFormValues
}

const initialState: ContactsState = {
	loading: false,
	error: null,
	data: [],
	filter: {
		name: '',
		groupId: '',
	},
}

export function contactsReducer(
	state = initialState,
	action: ContactsAction
): ContactsState {
	switch (action.type) {
		case FETCH_CONTACTS_START:
			return { ...state, loading: true, error: null }
		case FETCH_CONTACTS_SUCCESS:
			return { ...state, loading: false, data: action.payload }
		case FETCH_CONTACTS_FAILURE:
			return { ...state, loading: false, error: action.payload }
		case SET_CONTACTS_FILTER:
			return {
				...state,
				filter: {
					...state.filter,
					...action.payload,
				},
			}
		default:
			return state
	}
}
