import { MOCK_URL_FAVORITE_CONTACTS } from 'src/constants/urls'
import { ContactDto } from 'src/types/dto/ContactDto'

export class FavoriteContactsApi {
	async fetchContacts(): Promise<ContactDto[]> {
		const response = await fetch(MOCK_URL_FAVORITE_CONTACTS)
		if (!response.ok) throw new Error('Failed to fetch contacts')
		return await response.json()
	}
}
