import { Formik } from 'formik'
import { memo, useEffect } from 'react'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { fetchGroups } from 'src/redux/groups'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'

export interface FilterFormValues {
	name: string
	groupId: string
}

interface FilterFormProps {
	onSubmit: (values: FilterFormValues) => void
}

export const FilterForm = memo<FilterFormProps>(({ onSubmit }) => {
	const dispatch = useAppDispatch()

	const { groupsList } = useAppSelector(state => state.groups)
	const { filter } = useAppSelector(state => state.contacts)

	useEffect(() => {
		dispatch(fetchGroups())
	}, [dispatch])

	return (
		<Formik initialValues={filter} onSubmit={onSubmit}>
			{({ handleChange, handleSubmit }) => (
				<Form onSubmit={handleSubmit}>
					<Row xxl={4} className='g-4'>
						<Col>
							<InputGroup className='mb-3'>
								<Form.Control
									id={'name'}
									name={'name'}
									onChange={handleChange}
									placeholder='name'
									aria-label='name'
								/>
							</InputGroup>
						</Col>
						<Col>
							<Form.Select
								id={'groupId'}
								name={'groupId'}
								aria-label='Поиск по группе'
								onChange={handleChange}
							>
								<option value=''>Open this select menu</option>
								{groupsList.map(groupContacts => (
									<option value={groupContacts.id} key={groupContacts.id}>
										{groupContacts.name}
									</option>
								))}
							</Form.Select>
						</Col>
						<Col>
							<Button variant={'primary'} type='submit'>
								Применить
							</Button>
						</Col>
					</Row>
				</Form>
			)}
		</Formik>
	)
})
