import { makeAutoObservable } from 'mobx'
import { ContactDto } from 'src/types/dto/ContactDto'
import { FavoriteContactsApi } from './api'

const api = new FavoriteContactsApi()

export const favoriteContactsStore = makeAutoObservable({
	favoriteContacts: [] as ContactDto[],
	loading: false,
	error: null as string | null,

	*get() {
		favoriteContactsStore.loading = true
		favoriteContactsStore.error = null

		try {
			const data: ContactDto[] = yield api.fetchContacts()

			favoriteContactsStore.favoriteContacts = data
		} catch (error) {
			console.error('Ошибка загрузки контактов:', error)
			favoriteContactsStore.error = 'Не удалось загрузить контакты'
		} finally {
			favoriteContactsStore.loading = false
		}
	},
})
