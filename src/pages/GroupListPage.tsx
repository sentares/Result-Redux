import { memo, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import { fetchGroups } from 'src/redux/groups'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'

export const GroupListPage = memo(() => {
	const dispatch = useAppDispatch()

	const { groupsList } = useAppSelector(state => state.groups)

	useEffect(() => {
		if (groupsList.length === 0) {
			dispatch(fetchGroups())
		}
	}, [dispatch])

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
