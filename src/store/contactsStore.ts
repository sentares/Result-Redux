import { makeAutoObservable } from 'mobx'
import { FilterFormValues } from 'src/components/FilterForm'
import { ContactDto } from 'src/types/dto/ContactDto'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'
import { ContactsApi } from './api'
import { groupsStore } from './groupsStore'

const api = new ContactsApi()

export const contactsStore = makeAutoObservable({
	contacts: [] as ContactDto[],
	loading: false,
	error: null as string | null,
	filter: {
		name: '',
		groupId: '',
	} as FilterFormValues,

	setFilter(newFilter: Partial<FilterFormValues>) {
		contactsStore.filter = {
			...contactsStore.filter,
			...newFilter,
		}
	},

	*get() {
		contactsStore.loading = true
		contactsStore.error = null

		try {
			const data: ContactDto[] = yield api.fetchContacts()

			contactsStore.contacts = data
		} catch (error) {
			console.error('Ошибка загрузки контактов:', error)
			contactsStore.error = 'Не удалось загрузить контакты'
		} finally {
			contactsStore.loading = false
		}
	},

	get filteredContacts(): ContactDto[] {
		const { name, groupId } = contactsStore.filter

		return contactsStore.contacts.filter((contact: ContactDto) => {
			const nameMatch = name
				? contact.name.toLowerCase().includes(name.toLowerCase())
				: true

			const groupMatch =
				!groupId || groupId === 'Open this select menu'
					? true
					: groupsStore.groups.some(
							(group: GroupContactsDto) =>
								group.id === groupId && group.contactIds.includes(contact.id)
					  )

			return nameMatch && groupMatch
		})
	},

	reset() {
		contactsStore.contacts = []
		contactsStore.filter = {
			name: '',
			groupId: '',
		}
		contactsStore.error = null
	},
})
