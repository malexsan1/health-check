import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Button, Header, Card, Divider } from 'semantic-ui-react'

import * as teamsGQL from '../graphql/teams'

class MainDashboard extends Component {
  goToTeam = teamId => () => {
    this.props.history.push(`/team/${teamId}`)
  }

  render() {
    return (
      <Fragment>
        <Header as="h1">Main dashboard</Header>
        <Divider />
        <Button primary as={Link} to="/create-team">
          Create new team
        </Button>

        <Header as="h3">Teams</Header>
        <Query query={teamsGQL.GET_TEAMS}>
          {({ data, loading }) =>
            loading ? (
              <span>loading...</span>
            ) : (
              <Card.Group itemsPerRow={4}>
                {data.teams.map(team => (
                  <Card key={team.id} onClick={this.goToTeam(team.id)}>
                    <Card.Content>
                      <Card.Header>{team.name}</Card.Header>
                    </Card.Content>
                  </Card>
                ))}
              </Card.Group>
            )
          }
        </Query>
      </Fragment>
    )
  }
}

export default MainDashboard
