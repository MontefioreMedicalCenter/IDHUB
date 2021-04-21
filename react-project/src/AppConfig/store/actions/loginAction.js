export const LOGIN_SUCESSFUL = 'LOGIN_SUCESSFUL'

export const saveLoginModel = data => dispatch => {
	dispatch({
		type: LOGIN_SUCESSFUL,
		payload: data
	})
}
