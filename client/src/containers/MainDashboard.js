import React from 'react'
import { css } from 'emotion'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button, Header, Container, List } from 'semantic-ui-react'

const teams = [
  { id: 'team1', name: 'Team 1' },
  { id: 'team2', name: 'Team 2' },
  { id: 'team3', name: 'Team 3' },
]

const MainDashboard = () => (
  <Container className={containerMargin}>
    <Header as="h1">Main dashboard</Header>
    <Button primary as={Link} to="/create-team">
      Create new team
    </Button>

    <Header as="h3">Teams</Header>
    <List horizontal>
      {teams.map(t => (
        <List.Item key={t.id} as={Link} to={`/team/${t.id}`}>
          {t.name}
        </List.Item>
      ))}
    </List>
  </Container>
)

export default MainDashboard

// #region styled-components
const containerMargin = css`
  margin: 20px 0;
`
const Root = styled.div`
  display: flex;
  flex-direction: column;
`
// #endregion
