import { memo, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { ContactCard } from 'src/components/ContactCard'
import { fetchFavoriteContacts } from 'src/redux/favotire'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'

export const FavoritListPage = memo(() => {
	const dispatch = useAppDispatch()

	const { favoriteContactList } = useAppSelector(
		state => state.favoriteContacts
	)

	useEffect(() => {
		if (favoriteContactList.length === 0) {
			dispatch(fetchFavoriteContacts())
		}
	}, [])
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
