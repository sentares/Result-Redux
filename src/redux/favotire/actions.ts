import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { ContactDto } from 'src/types/dto/ContactDto'
import { RootState } from '../store'

const MOCK_URL_FAVORITE_CONTACTS =
	'https://mocki.io/v1/0d69d9e7-8ef5-47ba-96fc-e23f812f41a2'

export const FETCH_FAVORITE_CONTACTS_START = 'FETCH_FAVORITE_CONTACTS_START'
export const FETCH_FAVORITE_CONTACTS_SUCCESS = 'FETCH_FAVORITE_CONTACTS_SUCCESS'
export const FETCH_FAVORITE_CONTACTS_FAILURE = 'FETCH_FAVORITE_CONTACTS_FAILURE'

interface FetchFavoriteContactsStartAction {
	type: typeof FETCH_FAVORITE_CONTACTS_START
}

interface FetchFavoriteContactsSuccessAction {
	type: typeof FETCH_FAVORITE_CONTACTS_SUCCESS
	payload: ContactDto[]
}

interface FetchFavoriteContactsFailureAction {
	type: typeof FETCH_FAVORITE_CONTACTS_FAILURE
	payload: string
}

export function fetchFavoriteContacts(): ThunkAction<
	void,
	RootState,
	void,
	FavoriteContactsAction
> {
	return async (dispatch: Dispatch<FavoriteContactsAction>) => {
		dispatch({ type: FETCH_FAVORITE_CONTACTS_START })

		try {
			const response = await fetch(MOCK_URL_FAVORITE_CONTACTS)

			if (!response.ok) throw new Error('Ошибка при загрузке контактов')
			const data: ContactDto[] = await response.json()

			dispatch({ type: FETCH_FAVORITE_CONTACTS_SUCCESS, payload: data })
		} catch (error: any) {
			dispatch({
				type: FETCH_FAVORITE_CONTACTS_FAILURE,
				payload: error.message,
			})
		}
	}
}

export type FavoriteContactsAction =
	| FetchFavoriteContactsStartAction
	| FetchFavoriteContactsSuccessAction
	| FetchFavoriteContactsFailureAction
