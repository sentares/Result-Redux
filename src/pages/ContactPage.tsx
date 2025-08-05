import { FC, useMemo } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { ContactCard } from 'src/components/ContactCard'
import { Empty } from 'src/components/Empty'
import { useGetContactsQuery } from 'src/store/contacts'

export const ContactPage: FC = () => {
	const { contactId } = useParams<{ contactId: string }>()
	const { data: contactsList = [] } = useGetContactsQuery()

	const contact = useMemo(
		() => contactsList.find(({ id }) => id === contactId),
		[contactId, contactsList]
	)

	return (
		<Row xxl={3}>
			<Col className={'mx-auto'}>
				{contact ? <ContactCard contact={contact} /> : <Empty />}
			</Col>
		</Row>
	)
}
