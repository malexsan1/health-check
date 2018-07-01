import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { Header, Icon, Button, Divider } from 'semantic-ui-react'

import * as teamsGQL from '../graphql/teams'

const TeamDashboard = ({
  history,
  match: {
    params: { teamId },
  },
}) => (
  <Query query={teamsGQL.GET_TEAM} variables={{ teamId }}>
    {({ data: { team }, loading }) =>
      loading ? (
        <span>Loading...</span>
      ) : (
        <Fragment>
          <Header as="h3">
            <Icon name="arrow left" onClick={history.goBack} />
            <Header.Content>{`${team.name} dashboard`}</Header.Content>
          </Header>
          <Divider />
          <Button.Group>
            <Button
              content="Reports"
              icon="pause"
              labelPosition="right"
              onClick={() => console.log('go to reports')}
            />
            <Button
              primary
              icon="heart"
              labelPosition="right"
              content="New health check!"
              onClick={() => history.push(`/health-check/${teamId}`)}
            />
          </Button.Group>
        </Fragment>
      )
    }
  </Query>
)

export default TeamDashboard
