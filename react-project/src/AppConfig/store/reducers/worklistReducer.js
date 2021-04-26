import {
	LOOKUP_SUCCESSFULL,
	SET_DOCUMENT_LIBRARY,
	SET_TAB_VALUE
} from '../actions/workListSheet'

const initialState = {
	workListmodel: {},
	documentLibrary: [],
	tabValue: 0,
}

const worklistReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOOKUP_SUCCESSFULL:
			return {
				...state,
				workListmodel: action.payload
			}
		case SET_DOCUMENT_LIBRARY:
			return {
				...state,
				documentLibrary: action.payload
			}
		case SET_TAB_VALUE:
			return {
				...state,
				tabValue: action.payload
			}
		default:
			return state
	}
}

export default worklistReducer
