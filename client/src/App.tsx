import * as React from 'react'
import { render } from 'react-dom'
import './App.css'
import Root from './containers/Root'
import rootSaga from './sagas'
import configureStore from './store/configureStore'

const store = configureStore()
store.runSaga(rootSaga)

export default class App extends React.Component {
  public render() {
    return <Root store={store} />
  }
}
