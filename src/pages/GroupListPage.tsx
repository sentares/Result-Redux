import { memo } from 'react'
import { Col, Row } from 'react-bootstrap'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import { useGetGroupsQuery } from 'src/redux/groups'

export const GroupListPage = memo(() => {
	const { data: groupsList = [] } = useGetGroupsQuery()

	return (
		<Row xxl={4}>
			{groupsList.map(groupContacts => (
				<Col key={groupContacts.id}>
					<GroupContactsCard groupContacts={groupContacts} withLink />
				</Col>
			))}
		</Row>
	)
})
