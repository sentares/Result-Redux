import { observer } from 'mobx-react-lite'
import { FC, useEffect, useMemo } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { ContactCard } from 'src/components/ContactCard'
import { Empty } from 'src/components/Empty'
import { contactsStore } from 'src/store'

export const ContactPage: FC = observer(() => {
	const { contactId } = useParams<{ contactId: string }>()
	const { contacts, get } = contactsStore

	const contact = useMemo(
		() => contacts.find(({ id }) => id === contactId),
		[contactId, contacts]
	)

	useEffect(() => {
		if (!contacts.length) {
			get()
		}
	}, [contact])

	return (
		<Row xxl={3}>
			<Col className='mx-auto'>
				{contact ? <ContactCard contact={contact} /> : <Empty />}
			</Col>
		</Row>
	)
})
