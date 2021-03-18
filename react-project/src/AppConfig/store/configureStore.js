import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

const configureStore = () => {
  const middlewares = [thunk]

  const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares)
  )

  return { store }
}

export default configureStore
