export const SHOW_DELETE = 'SHOW_DELETE'
export const SHOW_UPLOAD = 'SHOW_UPLOAD'

export const showDelete = data => dispatch => {
	dispatch({
		type: SHOW_DELETE,
		payload: data
	})
}

export const showUpload = data => dispatch => {
	dispatch({
		type: SHOW_UPLOAD,
		payload: data
	})
}
