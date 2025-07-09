import { memo, useEffect, useMemo } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { ContactCard } from 'src/components/ContactCard'
import { Empty } from 'src/components/Empty'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import { fetchContacts } from 'src/redux/contacts'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'

export const GroupPage = memo(() => {
	const { groupId } = useParams<{ groupId: string }>()
	const dispatch = useAppDispatch()

	const { groupsList } = useAppSelector(state => state.groups)
	const { contactsList } = useAppSelector(state => state.contacts)

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

	useEffect(() => {
		if (contactsList.length === 0) {
			dispatch(fetchContacts())
		}
	}, [contactsList.length, dispatch])

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
