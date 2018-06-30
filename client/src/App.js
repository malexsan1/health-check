import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import {
  TeamCreation,
  MainDashboard,
  TeamDashboard,
  HealthCheckSession,
} from './containers'

const App = () => (
  <Fragment>
    <Route exact path="/" component={MainDashboard} />
    <Route path="/create-team" component={TeamCreation} />
    <Route path="/team/:teamId" component={TeamDashboard} />
    <Route path="/health-check/:teamId" component={HealthCheckSession} />
  </Fragment>
)

export default App
