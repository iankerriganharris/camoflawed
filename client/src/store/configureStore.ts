import { applyMiddleware, compose, createStore, Store } from 'redux'
import createSagaMiddleware, { Task } from 'redux-saga'
import rootReducer from '../reducers'

interface ICustomStore extends Store {
  runSaga: () => Task
}

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    compose(applyMiddleware(sagaMiddleware))
  )

  return {
    ...store,
    runSaga: sagaMiddleware.run
  }
}
