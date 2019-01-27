import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { Store } from 'redux'
import Routes from '../routes'
import DevTools from './DevTools'

interface IRootProps {
  store: Store
}

export default class Root extends Component<IRootProps, {}> {
  public render() {
    const { store } = this.props

    return (
      <Provider store={store}>
        <main>
          <Router>
            <Routes />
          </Router>
          <DevTools />
        </main>
      </Provider>
    )
  }
}
