import {
	LOOKUP_SUCCESSFULL,
	SET_DOCUMENT_LIBRARY
} from '../actions/workListSheet'

const initialState = {
	workListmodel: {},
	documentLibrary: []
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
		default:
			return state
	}
}

export default worklistReducer
