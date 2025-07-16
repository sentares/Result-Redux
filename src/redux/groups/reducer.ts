import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MOCK_URL_CONTACTS, MOCK_URL_GROUPS } from 'src/constants/urls'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'

export const groupsApiSlice = createApi({
	reducerPath: 'groupsApi',
	baseQuery: fetchBaseQuery({ baseUrl: MOCK_URL_GROUPS }),
	endpoints(builder) {
		return {
			getGroups: builder.query<GroupContactsDto[], void>({
				query: () => ({ url: MOCK_URL_CONTACTS }),
			}),
		}
	},
})

export const { useGetGroupsQuery } = groupsApiSlice
