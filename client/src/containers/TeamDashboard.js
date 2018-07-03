import React, { Fragment } from 'react'
import moment from 'moment'
import { last } from 'lodash'
import { cx, css } from 'emotion'
import { Query } from 'react-apollo'
import { withState } from 'recompose'
import { Route, withRouter } from 'react-router-dom'
import { Header, Icon, Button, Divider, Card } from 'semantic-ui-react'

import { SessionReport } from './'

import * as teamsGQL from '../graphql/teams'

const TeamDashboard = ({
  history,
  setSession,
  selectedSession,
  match: {
    params: { teamId },
  },
}) => (
  <Query query={teamsGQL.GET_TEAM_WITH_SESSIONS} variables={{ teamId }}>
    {({ data: { team, teamSessions }, loading }) =>
      loading ? (
        <span>Loading...</span>
      ) : (
        <Fragment>
          <Header as="h3">
            <Icon name="arrow left" onClick={() => history.push('/')} />
            <Header.Content>{`${team.name} dashboard`}</Header.Content>
          </Header>
          <Divider />

          <Button
            primary
            icon="heart"
            labelPosition="right"
            content="New health check!"
            onClick={() => history.push(`/health-check/${teamId}`)}
          />
          <Divider hidden />
          <Card.Group itemsPerRow={4}>
            {teamSessions.map((session, index) => (
              <Card
                key={session.id}
                className={cx(selectedSession === session.id && selected)}
                onClick={() => {
                  history.push(`/team/${teamId}/session/${session.id}`)
                  setSession(session.id)
                }}
              >
                <Card.Content>
                  <Card.Header>{`Session #${index + 1}`}</Card.Header>
                  <Card.Content>
                    {moment(session.created).format(`DD/MM/YYYY`)}
                  </Card.Content>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
          <Divider hidden />
          <Route
            path="/team/:teamId/session/:sessionId"
            component={SessionReport}
          />
        </Fragment>
      )
    }
  </Query>
)

export default withState('selectedSession', 'setSession', ({ location }) =>
  last(location.pathname.split('/')),
)(TeamDashboard)

// #region styles
const selected = css`
  background-color: rgba(33, 133, 208, 0.2) !important;
`
// #endregion
