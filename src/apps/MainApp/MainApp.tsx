import { ThemeProvider } from 'react-bootstrap'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Layout } from 'src/components/Layout'
import {
	ContactListPage,
	ContactPage,
	FavoritListPage,
	GroupListPage,
	GroupPage,
} from 'src/pages'
import { persistor, store } from 'src/store/store'
import './MainApp.scss'

export const MainApp = () => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={<div>Loading...</div>}>
				<ThemeProvider
					breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
					minBreakpoint='xxs'
				>
					<BrowserRouter>
						<Routes>
							<Route path='/' element={<Layout />}>
								<Route index element={<ContactListPage />} />
								<Route path='contact'>
									<Route index element={<ContactListPage />} />
									<Route path=':contactId' element={<ContactPage />} />
								</Route>
								<Route path='groups'>
									<Route index element={<GroupListPage />} />
									<Route path=':groupId' element={<GroupPage />} />
								</Route>
								<Route path='favorit' element={<FavoritListPage />} />
							</Route>
						</Routes>
					</BrowserRouter>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	)
}
