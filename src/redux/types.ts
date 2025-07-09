import { ContactsAction } from './contacts'
import { FavoriteContactsAction } from './favotire'
import { GroupsAction } from './groups'

export type AppActions = ContactsAction | GroupsAction | FavoriteContactsAction
