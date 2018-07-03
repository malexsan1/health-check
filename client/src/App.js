import React from 'react'
import { css } from 'emotion'
import { Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import {
  TeamCreation,
  SessionReport,
  MainDashboard,
  TeamDashboard,
  HealthCheckSession,
} from './containers'

const App = () => (
  <Container className={containerMargin}>
    <Route exact path="/" component={MainDashboard} />
    <Route path="/create-team" component={TeamCreation} />
    <Route path="/team/:teamId" component={TeamDashboard} />
    <Route path="/health-check/:teamId" component={HealthCheckSession} />
    {/* <Route path="/team/:teamId/session/:sessionId" component={SessionReport} /> */}
  </Container>
)

export default App

// #region styles
const containerMargin = css`
  margin: 20px 0;
`
// #endregion
