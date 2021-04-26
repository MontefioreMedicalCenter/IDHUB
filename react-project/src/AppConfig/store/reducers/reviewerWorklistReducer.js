import {POP_UP, STORE_WORKLIST} from '../actions/reviewerWorklistAction'

const initialState = {
	documentPopup: false,
	workList: {}
}

const reviewerWorklistReducer = (state = initialState, action) => {
	switch (action.type) {
        case POP_UP :
            return {
				...state,
				documentPopup: action.payload
			}
        case STORE_WORKLIST :
            return {
				...state,
				workList: action.payload
			}
        default:
			return state
	}
}

export default reviewerWorklistReducer