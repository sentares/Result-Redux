import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { MOCK_URL_GROUPS } from 'src/constants/urls'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'
import { RootState } from '../store'

export const FETCH_GROUPS_START = 'FETCH_GROUPS_START'
export const FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS'
export const FETCH_GROUPS_FAILURE = 'FETCH_GROUPS_FAILURE'

interface FetchGroupsStartAction {
	type: typeof FETCH_GROUPS_START
}

interface FetchGroupsSuccessAction {
	type: typeof FETCH_GROUPS_SUCCESS
	payload: GroupContactsDto[]
}

interface FetchGroupsFailureAction {
	type: typeof FETCH_GROUPS_FAILURE
	payload: string
}

export function fetchGroups(): ThunkAction<
	void,
	RootState,
	void,
	GroupsAction
> {
	return async (dispatch: Dispatch<GroupsAction>) => {
		dispatch({ type: FETCH_GROUPS_START })

		try {
			const response = await fetch(MOCK_URL_GROUPS)

			if (!response.ok) throw new Error('Ошибка при загрузке контактов')
			const data: GroupContactsDto[] = await response.json()

			dispatch({ type: FETCH_GROUPS_SUCCESS, payload: data })
		} catch (error: any) {
			dispatch({ type: 'FETCH_GROUPS_FAILURE', payload: error.message })
		}
	}
}

export type GroupsAction =
	| FetchGroupsStartAction
	| FetchGroupsSuccessAction
	| FetchGroupsFailureAction
