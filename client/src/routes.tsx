import * as React from 'react'
import { Route } from 'react-router-dom'
import { SideNav, TopNav } from './components'
import { PageLayout } from './components/PageLayout'
import { Company, Home, Industries, Industry } from './containers'

const Routes = () => (
  <>
    <PageLayout>
      <header>
        <TopNav />
      </header>
      <nav>
        <SideNav />
      </nav>
      <main>
        <Route exact path="/" component={Home} />
        <Route exact path="/industries" component={Industries} />
        <Route path="/industries/:id" component={Industry} />
        <Route path="/companies/:id" component={Company} />
      </main>
      <aside>Aside</aside>
      <footer>
        <p>&copy; me</p>
      </footer>
    </PageLayout>
  </>
)

export default Routes
