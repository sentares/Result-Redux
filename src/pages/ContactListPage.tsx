import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { ContactCard } from 'src/components/ContactCard'
import { FilterForm, FilterFormValues } from 'src/components/FilterForm'
import { contactsStore, groupsStore } from 'src/store'

export const ContactListPage = observer(() => {
	useEffect(() => {
		contactsStore.get()
		groupsStore.get()
	}, [])

	const onSubmit = (formValue: Partial<FilterFormValues>) => {
		contactsStore.setFilter(formValue)
	}

	const { filteredContacts } = contactsStore

	return (
		<Row xxl={1}>
			<Col className='mb-3'>
				<FilterForm onSubmit={onSubmit} />
			</Col>
			<Col>
				<Row xxl={4} className='g-4'>
					{filteredContacts?.map(contact => (
						<Col key={contact.id}>
							<ContactCard contact={contact} withLink />
						</Col>
					))}
				</Row>
			</Col>
		</Row>
	)
})
