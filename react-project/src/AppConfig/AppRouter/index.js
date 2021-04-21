import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import ROUTES from './constant'

const AppRouter = () => {
	return (
		<BrowserRouter basename={window.location.pathname.split('main')[0]}>
			<Switch>
				{ROUTES &&
					ROUTES.length &&
					ROUTES.map((route, index) => {
						if (route.private) {
							return (
								<PrivateRoute
									key={index}
									path={route.url}
									exact={route.exact}
									component={route.component}
								/>
							)
						} else {
							return (
								<Route
									key={index}
									path={route.url}
									exact={route.exact}
									component={route.component}
								/>
							)
						}
					})}
			</Switch>
		</BrowserRouter>
	)
}

export default AppRouter
