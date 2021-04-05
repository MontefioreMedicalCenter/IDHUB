import { combineReducers } from 'redux'
import documentLibraryReducer from './reducers/documentLibraryReducer'
import loginReducer from './reducers/loginReducer'
import worklistReducer from './reducers/worklistReducer'

const appReducer = combineReducers({
    loginState: loginReducer,
    workListState: worklistReducer,
    documentLibraryState: documentLibraryReducer,
})

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer