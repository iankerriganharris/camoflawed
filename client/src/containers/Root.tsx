import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { default as Industries } from './Industries'

interface IRootProps {
  store: Store
}

export default class Root extends Component<IRootProps, {}> {
  public render() {
    const { store } = this.props

    return (
      <Provider store={store}>
        <main>
          <Industries />
        </main>
      </Provider>
    )
  }
}
