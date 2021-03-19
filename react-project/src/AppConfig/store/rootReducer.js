import { combineReducers } from 'redux'
import loginReducer from './reducers/loginReducer'

const appReducer = combineReducers({
    loginState: loginReducer,
})

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer