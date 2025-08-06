import { ContactDto } from 'src/types/dto/ContactDto'
import { MOCK_URL_CONTACTS } from 'src/constants/urls'

export class ContactsApi {
	async fetchContacts(): Promise<ContactDto[]> {
		const response = await fetch(MOCK_URL_CONTACTS)
		if (!response.ok) throw new Error('Failed to fetch contacts')
		return await response.json()
	}
}
