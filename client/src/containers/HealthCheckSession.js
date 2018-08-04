import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { Header, Divider, Icon } from 'semantic-ui-react'

import * as teamsGQL from '../graphql/teams'
import { HealthCheckWizard } from '../components'

const HealthCheckSession = ({
  history,
  match: {
    params: { teamId },
  },
}) => (
  <Fragment>
    <Header as="h3">
      <Icon name="arrow left" onClick={history.goBack} />
      <Header.Content>Health check session</Header.Content>
    </Header>
    <Divider />
    <Query query={teamsGQL.GET_HEALTH_TEAM} variables={{ teamId }}>
      {({ data: { teamForHealthCheck }, loading }) => {
        return loading ? (
          <span>loading...</span>
        ) : (
          <HealthCheckWizard
            teamId={teamId}
            goTo={history.push}
            maxSteps={teamForHealthCheck.topics.length - 1}
            {...teamForHealthCheck}
          />
        )
      }}
    </Query>
  </Fragment>
)

export default HealthCheckSession
