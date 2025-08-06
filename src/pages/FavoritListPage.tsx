import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { ContactCard } from 'src/components/ContactCard'
import { favoriteContactsStore } from 'src/store'

export const FavoritListPage = observer(() => {
	const { favoriteContacts, get } = favoriteContactsStore

	useEffect(() => {
		if (!favoriteContacts.length) {
			get()
		}
	}, [])

	return (
		<Row xxl={4} className='g-4'>
			{favoriteContacts.map(contact => (
				<Col key={contact.id}>
					<ContactCard contact={contact} withLink />
				</Col>
			))}
		</Row>
	)
})
