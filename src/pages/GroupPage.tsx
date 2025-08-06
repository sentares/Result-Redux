import { observer } from 'mobx-react-lite'
import { useEffect, useMemo } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { ContactCard } from 'src/components/ContactCard'
import { Empty } from 'src/components/Empty'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import { contactsStore, groupsStore } from 'src/store'

export const GroupPage = observer(() => {
	const { groupId } = useParams<{ groupId: string }>()
	const { groups, get: getGroups } = groupsStore
	const { contacts, get: getContacts } = contactsStore

	const groupContacts = useMemo(
		() => groups.find(({ id }) => id === groupId),
		[groupId, groups]
	)

	const contactsList = useMemo(() => {
		if (!groupContacts) return []
		return contacts.filter(contact =>
			groupContacts.contactIds.includes(contact.id)
		)
	}, [contacts, groupContacts])

	useEffect(() => {
		if (!groups.length) {
			getGroups()
		}
		if (!contacts.length) {
			getContacts()
		}
	}, [])

	return (
		<Row className='g-4'>
			{groupContacts ? (
				<>
					<Col xxl={12}>
						<Row xxl={3}>
							<Col className='mx-auto'>
								<GroupContactsCard groupContacts={groupContacts} />
							</Col>
						</Row>
					</Col>
					<Col>
						<Row xxl={4} className='g-4'>
							{contactsList.map(contact => (
								<Col key={contact.id}>
									<ContactCard contact={contact} withLink />
								</Col>
							))}
						</Row>
					</Col>
				</>
			) : (
				<Empty />
			)}
		</Row>
	)
})
