import { combineReducers } from 'redux'
import documentLibraryReducer from './reducers/documentLibraryReducer'
import homeReducer from './reducers/homeReducer'
import loginReducer from './reducers/loginReducer'
import reviewerWorklistReducer from './reducers/reviewerWorklistReducer'
import worklistReducer from './reducers/worklistReducer'

const appReducer = combineReducers({
	loginState: loginReducer,
	homeState: homeReducer,
	workListState: worklistReducer,
	documentLibraryState: documentLibraryReducer,
	reviewerState: reviewerWorklistReducer,
})

const rootReducer = (state, action) => {
	return appReducer(state, action)
}

export default rootReducer
