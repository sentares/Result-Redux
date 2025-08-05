import { memo } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { ContactCard } from 'src/components/ContactCard'
import { FilterForm, FilterFormValues } from 'src/components/FilterForm'
import { useFilteredContacts } from 'src/helpers/hooks'
import { setContactsFilter } from 'src/store/contacts'

export const ContactListPage = memo(() => {
	const dispatch = useDispatch()

	const filteredContacts = useFilteredContacts()

	const onSubmit = (formValue: Partial<FilterFormValues>) => {
		dispatch(setContactsFilter(formValue))
	}

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
