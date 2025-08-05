import { memo } from 'react'
import { Col, Row } from 'react-bootstrap'
import { ContactCard } from 'src/components/ContactCard'
import { useGetFavoriteContactsQuery } from 'src/store/favotire'

export const FavoritListPage = memo(() => {
	const { data: favoriteContactList = [] } = useGetFavoriteContactsQuery()

	return (
		<Row xxl={4} className='g-4'>
			{favoriteContactList.map(contact => (
				<Col key={contact.id}>
					<ContactCard contact={contact} withLink />
				</Col>
			))}
		</Row>
	)
})
