import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'
import {
	FETCH_GROUPS_START,
	FETCH_GROUPS_SUCCESS,
	FETCH_GROUPS_FAILURE,
	GroupsAction,
} from './actions'

interface GroupsState {
	loading: boolean
	error: string | null
	data: GroupContactsDto[]
}

const initialState: GroupsState = {
	loading: false,
	error: null,
	data: [],
}

export function groupsReducer(
	state = initialState,
	action: GroupsAction
): GroupsState {
	switch (action.type) {
		case FETCH_GROUPS_START:
			return { ...state, loading: true, error: null }
		case 'FETCH_GROUPS_SUCCESS':
			return { ...state, loading: false, data: action.payload }
		case 'FETCH_GROUPS_FAILURE':
			return { ...state, loading: false, error: action.payload }
		default:
			return state
	}
}
