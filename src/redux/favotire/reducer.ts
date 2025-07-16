import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MOCK_URL_FAVORITE_CONTACTS } from 'src/constants/urls'
import { ContactDto } from 'src/types/dto/ContactDto'

export const favoriteContactsApiSlice = createApi({
	reducerPath: 'favoriteContactsApi',
	baseQuery: fetchBaseQuery({ baseUrl: MOCK_URL_FAVORITE_CONTACTS }),
	endpoints(builder) {
		return {
			getFavoriteContacts: builder.query<ContactDto[], void>({
				query: () => ({ url: MOCK_URL_FAVORITE_CONTACTS }),
			}),
		}
	},
})

export const { useGetFavoriteContactsQuery } = favoriteContactsApiSlice
