import { memo, useMemo } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { ContactCard } from 'src/components/ContactCard'
import { Empty } from 'src/components/Empty'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import { useGetContactsQuery } from 'src/redux/contacts'
import { useAppSelector } from 'src/redux/hooks'

export const GroupPage = memo(() => {
	const { groupId } = useParams<{ groupId: string }>()
	const { groupsList } = useAppSelector(state => state.groups)
	const { data: contactsList = [] } = useGetContactsQuery()

	const groupContacts = useMemo(
		() => groupsList.find(({ id }) => id === groupId),
		[groupId, groupsList]
	)

	const contacts = useMemo(() => {
		if (!groupContacts) return []
		return contactsList.filter(contact =>
			groupContacts.contactIds.includes(contact.id)
		)
	}, [contactsList, groupContacts])

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
							{contacts.map(contact => (
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
