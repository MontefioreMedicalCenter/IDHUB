import { combineReducers } from 'redux'
import documentLibraryReducer from './reducers/documentLibraryReducer'
import homeReducer from './reducers/homeReducer'
import loginReducer from './reducers/loginReducer'
import worklistReducer from './reducers/worklistReducer'

const appReducer = combineReducers({
    loginState: loginReducer,
    homeState: homeReducer,
    workListState: worklistReducer,
    documentLibraryState: documentLibraryReducer,
})

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer