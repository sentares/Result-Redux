import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FilterFormValues } from 'src/components/FilterForm'
import { MOCK_URL_CONTACTS } from 'src/constants/urls'
import { ContactDto } from 'src/types/dto/ContactDto'

interface ContactsState {
	loading: boolean
	error: string | null
	filter: FilterFormValues
}

const initialState: ContactsState = {
	loading: false,
	error: null,
	filter: {
		name: '',
		groupId: '',
	},
}

export const contactsSlice = createSlice({
	name: 'contacts',
	initialState,
	reducers: {
		setContactsFilter(state, action: PayloadAction<Partial<FilterFormValues>>) {
			state.filter = {
				...state.filter,
				...action.payload,
			}
		},
	},
})

export const contactsApiSlice = createApi({
	reducerPath: 'contactsApi',
	baseQuery: fetchBaseQuery({ baseUrl: MOCK_URL_CONTACTS }),
	endpoints(builder) {
		return {
			getContacts: builder.query<ContactDto[], void>({
				query: () => ({ url: MOCK_URL_CONTACTS }),
			}),
		}
	},
})

export const { setContactsFilter } = contactsSlice.actions

export const { useGetContactsQuery } = contactsApiSlice
