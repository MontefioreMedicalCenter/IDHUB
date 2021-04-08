export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'

export const showMessage = (
	title,
	content,
	action,
	okHandler,
	cancelHandler
) => dispatch => {
	dispatch({
		type: SHOW_NOTIFICATION,
		payload: {
			title,
			content,
			action,
			onOk: okHandler,
			onCancel: cancelHandler
		}
	})
}

export const removeMessage = () => dispatch => {
	dispatch({
		type: REMOVE_NOTIFICATION,
		payload: null
	})
}
