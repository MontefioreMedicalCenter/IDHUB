import { combineReducers } from 'redux'
import loginReducer from './reducers/loginReducer'
import worklistReducer from './reducers/worklistReducer'

const appReducer = combineReducers({
    loginState: loginReducer,
    workListState: worklistReducer,
})

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer