import { applyMiddleware, compose, createStore, Store } from 'redux'
import createSagaMiddleware, { Task } from 'redux-saga'
import DevTools from '../containers/DevTools'
import rootReducer from '../reducers'

interface ICustomStore extends Store {
  runSaga: () => Task
}

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(sagaMiddleware),
      DevTools.instrument()
    )
  )

  return {
    ...store,
    runSaga: sagaMiddleware.run
  }
}
