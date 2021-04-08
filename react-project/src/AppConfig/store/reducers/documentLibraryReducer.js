import { SHOW_DELETE, SHOW_UPLOAD } from '../actions/documentLibrary'

const initialState = {
	showDelete: false,
	showUpload: false
}

const documentLibraryReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_DELETE:
			return {
				...state,
				showDelete: action.payload
			}
		case SHOW_UPLOAD:
			return {
				...state,
				showUpload: action.payload
			}
		default:
			return state
	}
}

export default documentLibraryReducer
