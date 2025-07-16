import { useMemo } from 'react'
import { useGetContactsQuery } from 'src/redux/contacts'
import { useAppSelector } from 'src/redux/hooks'

export const useFilteredContacts = () => {
	const { data: contacts = [] } = useGetContactsQuery()
	const { filter } = useAppSelector(state => state.contacts)
	const { groupsList } = useAppSelector(state => state.groups)

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
