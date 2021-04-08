import { LOGIN_SUCESSFUL } from '../actions/loginAction'

const initialState = {
	loginModel: {}
}

const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCESSFUL:
			return {
				...state,
				loginModel: action.payload
			}
		default:
			return state
	}
}
export default loginReducer
