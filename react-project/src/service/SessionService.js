import { updateToLocalStorage, fetchFromLocalStorage } from './ServiceHelper'

export const uinfo = {
	uid: '',
	pwd: ''
}

export const fakeAuth = {
	_isAuthenticated: false,
	get isAuthenticated() {
		const auth =
			!!fetchFromLocalStorage('authenticated') || this._isAuthenticated
		return auth
	},
	set isAuthenticated(value) {
		this._isAuthenticated = value
		updateToLocalStorage('authenticated', value)
	},
	authenticate() {
		this.isAuthenticated = true
	},
	signout(cb) {
		this.isAuthenticated = false
		cb()
	}
}
