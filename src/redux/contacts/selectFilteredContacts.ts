import { RootState } from '../store'
import { ContactDto } from 'src/types/dto/ContactDto'

export const selectFilteredContacts = (state: RootState): ContactDto[] => {
	const { data, filter } = state.contacts
	const groups = state.groups.data

	return data.filter(contact => {
		const nameMatch = filter.name
			? contact.name.toLowerCase().includes(filter.name.toLowerCase())
			: true

		const groupMatch =
			!filter.groupId || filter.groupId === 'Open this select menu'
				? true
				: groups.some(
						group =>
							group.id === filter.groupId &&
							group.contactIds.includes(contact.id)
				  )

		return nameMatch && groupMatch
	})
}
