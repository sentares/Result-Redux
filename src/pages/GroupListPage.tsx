import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import { groupsStore } from 'src/store'

export const GroupListPage = observer(() => {
	const { groups, get } = groupsStore

	useEffect(() => {
		if (!groups.length) {
			get()
		}
	}, [])

	return (
		<Row xxl={4}>
			{groups.map(groupContacts => (
				<Col key={groupContacts.id}>
					<GroupContactsCard groupContacts={groupContacts} withLink />
				</Col>
			))}
		</Row>
	)
})
