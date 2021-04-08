/**
 * Flexicious
 * Copyright 2011, Flexicious LLC
 */
import ServiceProxyBase from './ServiceProxyBase'
import qs from 'qs'
export default class LoginService extends ServiceProxyBase {
	constructor(props) {
		super(props)
		this.source = ''
	}

	getClassNames() {
		return ['LoginService', 'ServiceProxyBase']
	}

	login(username, password, resultHandler, faultHandler) {
		if (typeof faultHandler == 'undefined') faultHandler = null
		var bodyFormData = qs.stringify({
			userName: username,
			password: password
		})

		return this.callServiceMethod(
			'post',
			'IdentityHub/api/authenticationsvc/authenticateUser',
			bodyFormData,
			null,
			resultHandler,
			faultHandler,
			'form'
		)
	}

	logout(resultHandler, faultHandler) {
		if (typeof faultHandler == 'undefined') faultHandler = null
		var headerData = {
			userName: localStorage.getItem('user-id'),
			'Content-Type': 'application/json'
		}

		return this.callServiceMethod(
			'post',
			'IdentityHub/api/authenticationsvc/logOut',
			null,
			null,
			resultHandler,
			faultHandler,
			null,
			headerData
		)
	}
}

LoginService.prototype.typeName = LoginService.typeName = 'LoginService' //for quick inspection
LoginService.instance = null
LoginService.getInstance = () => {
	if (LoginService.instance == null) {
		LoginService.instance = new LoginService()
	}
	return LoginService.instance
}
