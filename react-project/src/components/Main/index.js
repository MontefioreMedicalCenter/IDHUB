import React, { useEffect, useState } from 'react'
import './main.style.scss'
import { Route, Switch, useHistory } from 'react-router'
import { PRIVATE_ROUTES } from '../../AppConfig/AppRouter/constant'
import CustomizedTabs from '../../shared/components/Tabs'
import { tabList, tabStyles } from './content'
import moment from 'moment'
import Montefiore from '../../assets/images/Doing-More-Logo.jpg'
import LoginService from '../../service/cfc/LoginService'
import { useDispatch, useSelector } from 'react-redux'
import AlertDialog from '../../shared/components/AlertDialog'
import { removeMessage, showMessage } from '../../AppConfig/store/actions/homeAction'
import IdleTimer from './IdleTimer'

const Main = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const loginModel = useSelector(state => state.loginState.loginModel)
	const alertData = useSelector(state => state.homeState.alertPopup)
	const [tabValue, handleTabChange] = useState(0)
	const dateString = `${moment().format('MM/DD/YYYY')}`
	const timeString = `${moment().format('HH:mm:ss')}`
	const [mainTabData, setTabData] = useState([])

	useEffect(() => {
		const timer = new IdleTimer({
			timeout: 3600, // checkin ideal time for 60 mins
			onTimeout: () => {
				handleOnSessionTimeout()
			}
		})

		return () => {
			timer.cleanup()
		}
		// eslint-disable-next-line
	}, [])

	const handleOnSessionTimeout = () => {
		dispatch(
			showMessage(
				'Session Timeout',
				'Session Timeout, Please login again.',
				'Ok',
				() => {
					handleLogout()
				},
			)
		)
	}

	useEffect(() => {
		document.addEventListener('logout', handleLogout)
		return () => {
			document.removeEventListener('logout', handleLogout)
		}
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		if (Object.keys(loginModel).length) {
			const isAdmin = loginModel.user.hasRole('Admin')
			// const isAdminRequestor = loginModel.user.hasRole("AdminRequestor")
			const isRequestor = loginModel.user.hasRole('Requestor')
			const isReviewer = loginModel.user.hasRole('Reviewer')

			let tabData = []
			if (isRequestor || isAdmin) {
				tabData.push(tabList[0])
			}
			if (isReviewer || isAdmin) {
				tabData.push(tabList[1])
			}
			if (isReviewer || isAdmin) {
				tabData.push(tabList[2])
			}
			if (isAdmin) {
				tabData.push(tabList[3])
			}
			setTabData(tabData)
		} else {
			history.push('/')
		}
	}, [loginModel, history])

	const onSuccessLogout = () => {
		localStorage.clear()
		history.push('/')
	}
	const onLogoutFail = err => {
		console.log('Logout Failed!', err)
	}

	const handleLogout = () => {
		LoginService.getInstance().logout(onSuccessLogout, onLogoutFail)
	}

	return (
		<div className="main-container">
			<div className="title">
				<div className="title-logo">
					<img
						id="montefiore"
						alt="Montefiorelogo"
						src={Montefiore}
						style={{ height: '30px' }}
					/>
				</div>
				<div className="title-content">
					{dateString} -&nbsp;
					{timeString} |&nbsp;
					{loginModel && loginModel.user ? loginModel.user.userId : ''} |&nbsp;
					<span className="logout-btn" onClick={handleLogout}>
						logout
					</span>
				</div>
			</div>
			<CustomizedTabs
				customstyle={tabStyles}
				setTabValue={handleTabChange}
				tabValue={tabValue}
				tabList={mainTabData}
			/>
			<div className="container-main-view">
				<Switch>
					{PRIVATE_ROUTES.map((route, idx) => {
						return route.component ? (
							<Route
								key={idx}
								path={route.url}
								exact={route.exact}
								name={route.name}
								render={props => <route.component {...props} />}
							/>
						) : null
					})}
				</Switch>
				<p
					style={{
						fontSize: '13px',
						textAlign: 'right',
						margin: '0px',
						padding: '0px 10px'
					}}>
					Content © 2018, MIT .All rights reserved.
				</p>
			</div>
			<AlertDialog {...alertData} onClose={() => dispatch(removeMessage())} />
		</div>
	)
}

export default Main
