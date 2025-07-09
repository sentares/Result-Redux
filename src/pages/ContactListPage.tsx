import { memo, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { ContactCard } from 'src/components/ContactCard'
import { FilterForm, FilterFormValues } from 'src/components/FilterForm'
import { fetchContacts, selectFilteredContacts } from 'src/redux/contacts'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'

export const ContactListPage = memo(() => {
	const dispatch = useAppDispatch()

	const filteredContacts = useAppSelector(selectFilteredContacts)

	const onSubmit = (formValue: Partial<FilterFormValues>) => {
		dispatch({
			type: 'SET_CONTACTS_FILTER',
			payload: formValue,
		})
	}

	useEffect(() => {
		if (filteredContacts.length === 0) {
			dispatch(fetchContacts())
		}
	}, [dispatch])

	return (
		<Row xxl={1}>
			<Col className='mb-3'>
				<FilterForm onSubmit={onSubmit} />
			</Col>
			<Col>
				<Row xxl={4} className='g-4'>
					{filteredContacts.map(contact => (
						<Col key={contact.id}>
							<ContactCard contact={contact} withLink />
						</Col>
					))}
				</Row>
			</Col>
		</Row>
	)
})
