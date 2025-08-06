import { MOCK_URL_GROUPS } from 'src/constants/urls'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'

export class GroupsApi {
	async fetchContacts(): Promise<GroupContactsDto[]> {
		const response = await fetch(MOCK_URL_GROUPS)
		if (!response.ok) throw new Error('Failed to fetch contacts')
		return await response.json()
	}
}
