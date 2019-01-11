import * as React from 'react'
import { Route } from 'react-router-dom'
import Industries from './containers/Industries'
import Industry from './containers/Industry'

const Routes = () => (
  <>
    <Route exact path="/industries" component={Industries} />
    <Route path="/industries/:id" component={Industry} />
  </>
)

export default Routes
