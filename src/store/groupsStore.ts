import { makeAutoObservable } from 'mobx'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'
import { GroupsApi } from './api'

const api = new GroupsApi()

export const groupsStore = makeAutoObservable({
	groups: [] as GroupContactsDto[],
	loading: false,
	error: null as string | null,

	*get() {
		groupsStore.loading = true
		groupsStore.error = null
		try {
			const data: GroupContactsDto[] = yield api.fetchContacts()
			groupsStore.groups = data
		} catch (error) {
			console.error('Ошибка загрузки групп:', error)
			groupsStore.error = 'Не удалось загрузить группы'
		} finally {
			groupsStore.loading = false
		}
	},
})
