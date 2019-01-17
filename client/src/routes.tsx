import * as React from 'react'
import { Route } from 'react-router-dom'
import { Company, Industries, Industry } from './containers'

const Routes = () => (
  <>
    <Route exact path="/industries" component={Industries} />
    <Route path="/industries/:id" component={Industry} />
    <Route path="/companies/:id" component={Company} />
  </>
)

export default Routes
