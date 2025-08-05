import { useMemo } from 'react'
import { useGetContactsQuery } from 'src/store/contacts'
import { useGetGroupsQuery } from 'src/store/groups'
import { useAppSelector } from 'src/store/hooks'

export const useFilteredContacts = () => {
	const { data: contacts = [] } = useGetContactsQuery()
	const { data: groupsList = [] } = useGetGroupsQuery()

	const { filter } = useAppSelector(state => state.contacts)

	return useMemo(() => {
		return contacts.filter(contact => {
			const nameMatch = filter.name
				? contact.name.toLowerCase().includes(filter.name.toLowerCase())
				: true

			const groupMatch =
				!filter.groupId || filter.groupId === 'Open this select menu'
					? true
					: groupsList.some(
							group =>
								group.id === filter.groupId &&
								group.contactIds.includes(contact.id)
					  )

			return nameMatch && groupMatch
		})
	}, [contacts, filter, groupsList])
}
