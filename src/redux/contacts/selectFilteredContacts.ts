import { ContactDto } from 'src/types/dto/ContactDto'
import { RootState } from '../store'

export const selectFilteredContacts = (state: RootState): ContactDto[] => {
	const { contactsList, filter } = state.contacts
	const { groupsList } = state.groups

	return contactsList.filter(contact => {
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
}
