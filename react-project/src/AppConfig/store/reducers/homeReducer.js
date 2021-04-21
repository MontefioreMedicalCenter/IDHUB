import { REMOVE_NOTIFICATION, SHOW_NOTIFICATION } from '../actions/homeAction'

const initialState = {
	alertPopup: null
}

const homeReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_NOTIFICATION:
			return {
				...state,
				alertPopup: action.payload
			}
		case REMOVE_NOTIFICATION:
			return {
				...state,
				alertPopup: action.payload
			}
		default:
			return state
	}
}
export default homeReducer
