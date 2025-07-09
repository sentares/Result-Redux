import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { ContactDto } from 'src/types/dto/ContactDto'
import { RootState } from '../store'
import { FilterFormValues } from 'src/components/FilterForm'

const MOCK_URL_CONTACTS =
	'https://mocki.io/v1/8ca3a382-b4fc-43f3-9f1d-5b738a5674de'

export const FETCH_CONTACTS_START = 'FETCH_CONTACTS_START'
export const FETCH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS'
export const FETCH_CONTACTS_FAILURE = 'FETCH_CONTACTS_FAILURE'
export const SET_CONTACTS_FILTER = 'SET_CONTACTS_FILTER'

interface FetchContactsStartAction {
	type: typeof FETCH_CONTACTS_START
}

interface FetchContactsSuccessAction {
	type: typeof FETCH_CONTACTS_SUCCESS
	payload: ContactDto[]
}

interface FetchContactsFailureAction {
	type: typeof FETCH_CONTACTS_FAILURE
	payload: string
}

interface SetContactsFilterAction {
	type: typeof SET_CONTACTS_FILTER
	payload: Partial<FilterFormValues>
}

export function fetchContacts(): ThunkAction<
	void,
	RootState,
	void,
	ContactsAction
> {
	return async (dispatch: Dispatch<ContactsAction>) => {
		dispatch({ type: FETCH_CONTACTS_START })

		try {
			const response = await fetch(MOCK_URL_CONTACTS)

			if (!response.ok) throw new Error('Ошибка при загрузке контактов')
			const data: ContactDto[] = await response.json()

			dispatch({ type: FETCH_CONTACTS_SUCCESS, payload: data })
		} catch (error: any) {
			dispatch({ type: FETCH_CONTACTS_FAILURE, payload: error.message })
		}
	}
}

export type ContactsAction =
	| FetchContactsStartAction
	| FetchContactsSuccessAction
	| FetchContactsFailureAction
	| SetContactsFilterAction
