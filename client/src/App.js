import React from 'react'
import { css } from 'emotion'
import { Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import {
  Auth,
  TeamCreation,
  MainDashboard,
  TeamDashboard,
  HealthCheckSession,
} from './containers'

const App = () => (
  <Container className={containerMargin}>
    {/* <Route path="/" component={Auth} /> */}

    <Route exact path="/" component={MainDashboard} />
    <Route path="/create-team" component={TeamCreation} />
    <Route path="/team/:teamId" component={TeamDashboard} />
    <Route path="/health-check/:teamId" component={HealthCheckSession} />
  </Container>
)

export default App

// #region styles
const containerMargin = css`
  margin: 20px 0;
`
// #endregion
