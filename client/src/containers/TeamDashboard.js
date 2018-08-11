import React, { Fragment } from 'react'
import { last } from 'lodash'
import { Query } from 'react-apollo'
import { Route } from 'react-router-dom'
import { compose, withState, withHandlers } from 'recompose'
import { Header, Icon, Button, Divider } from 'semantic-ui-react'

import { PreviousSessions } from '../components'
import { SessionReport, TopicReports } from './'

import * as teamsGQL from '../graphql/teams'

const TeamDashboard = ({
  history,
  setSession,
  selectSession,
  selectedSession,
  match: {
    params: { teamId },
  },
}) => (
  <Query query={teamsGQL.GET_TEAM_WITH_SESSIONS} variables={{ teamId }}>
    {({ data: { team, teamSessions = [], teamTopics = [] }, loading }) => {
      return loading ? (
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
          <PreviousSessions
            selectSession={selectSession}
            selectedSession={selectedSession}
            teamSessions={teamSessions}
          />
          <Divider hidden />
          <Route
            path="/team/:teamId/session/:sessionId"
            component={SessionReport}
          />
          <Divider hidden />
          <TopicReports teamId={teamId} />
        </Fragment>
      )
    }}
  </Query>
)

export default compose(
  withState('selectedSession', 'setSession', ({ location }) =>
    last(location.pathname.split('/')),
  ),
  withHandlers({
    selectSession: ({
      history,
      setSession,
      match: {
        params: { teamId },
      },
    }) => session => () => {
      history.push(`/team/${teamId}/session/${session.id}`)
      setSession(session.id)
    },
  }),
)(TeamDashboard)

// #region styles
// #endregion
