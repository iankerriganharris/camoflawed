import * as React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
import rootSaga from './sagas'
import configureStore from './store/configureStore'

const store = configureStore()
store.runSaga(rootSaga)

export default class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Root store={store} />
      </div>
    )
  }
}
