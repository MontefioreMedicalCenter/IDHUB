import { combineReducers } from 'redux'
import appCommon from '../../Components/AppLayout/reducer'

const appReducer = combineReducers({
    appCommon,
})

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer