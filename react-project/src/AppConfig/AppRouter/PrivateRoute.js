import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { authenticate } from '../../shared/utils'

const PrivateRoute = ({ component: Component, ...rest }) => {
	const isAuthenticated = authenticate()

	return (
		<Route
			{...rest}
			render={props => {
				const { location } = props
				const key = `${location.pathname}${location.search}`
				let redirectPath = location.pathname

				props = { ...props, key }

				return isAuthenticated ? (
					location.pathname !== redirectPath ? (
						<Redirect
							to={{
								pathname: redirectPath,
								state: { from: location }
							}}
						/>
					) : (
						<Component {...props} />
					)
				) : (
					<Redirect
						to={{
							pathname: '/',
							state: { from: location }
						}}
					/>
				)
			}}
		/>
	)
}

export default PrivateRoute
