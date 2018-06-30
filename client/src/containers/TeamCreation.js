import React, { Component, Fragment } from 'react'
import { css } from 'emotion'
import { Header, Button, Card, Input, Segment, List } from 'semantic-ui-react'

const topics = [
  {
    id: 'topic1',
    name: 'Mission',
    selected: false,
    description:
      'Veniam ut non voluptate exercitation magna consectetur cillum occaecat nostrud amet.',
  },
  {
    id: 'topic2',
    name: 'Learning',
    selected: false,
    description:
      'Veniam ut non voluptate exercitation magna consectetur cillum occaecat nostrud amet.',
  },
  {
    id: 'topic3',
    name: 'Health of codebase',
    selected: false,
    description:
      'Veniam ut non voluptate exercitation magna consectetur cillum occaecat nostrud amet.',
  },
  {
    id: 'topic4',
    name: 'Fun',
    selected: false,
    description:
      'Veniam ut non voluptate exercitation magna consectetur cillum occaecat nostrud amet.',
  },
  {
    id: 'topic5',
    name: 'Delivering value',
    selected: false,
    description:
      'Veniam ut non voluptate exercitation magna consectetur cillum occaecat nostrud amet.',
  },
  {
    id: 'topic6',
    name: 'Teamwork',
    selected: false,
    description:
      'Veniam ut non voluptate exercitation magna consectetur cillum occaecat nostrud amet.',
  },
  {
    id: 'topic7',
    name: 'Support',
    selected: false,
    description:
      'Veniam ut non voluptate exercitation magna consectetur cillum occaecat nostrud amet.',
  },
  {
    id: 'topic8',
    name: 'Suitable process',
    selected: false,
    description:
      'Veniam ut non voluptate exercitation magna consectetur cillum occaecat nostrud amet.',
  },
  {
    id: 'topic9',
    name: 'Speed',
    selected: false,
    description:
      'Veniam ut non voluptate exercitation magna consectetur cillum occaecat nostrud amet.',
  },
]

const TopicsStep = ({ topics, toggleTopic, teamName, changeTeamName }) => (
  <Fragment>
    <Header as="h3" textAlign="center">
      Select topics
    </Header>
    <Input
      fluid
      value={teamName}
      className={marginInput}
      placeholder="Team name"
      onChange={changeTeamName}
    />
    <Card.Group centered itemsPerRow={4}>
      {topics.map(t => (
        <Card
          key={t.id}
          onClick={toggleTopic(t.id)}
          color={t.selected ? 'blue' : null}
        >
          <Card.Content>
            <Card.Header>{t.name}</Card.Header>
            <Card.Description>{t.description}</Card.Description>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  </Fragment>
)

const UsersStep = ({ users, addUser, email, name, changeInput }) => (
  <Fragment>
    <Segment basic>
      <Input
        value={email}
        placeholder="Email"
        onChange={changeInput('userEmail')}
      />
      <Input
        value={name}
        onChange={changeInput('userName')}
        placeholder="Name"
      />
      <Button icon="add" onClick={addUser} />
    </Segment>
    <List celled>
      {users.map(u => (
        <List.Item key={u.email}>
          <List.Content>
            <List.Header>{u.name}</List.Header>
            {u.email}
          </List.Content>
        </List.Item>
      ))}
    </List>
  </Fragment>
)

class TeamCreation extends Component {
  state = {
    topics,
    step: 0,
    users: [
      { email: 'coco@san.com', name: 'plm cocobau' },
      { email: 'coco1@san.com', name: 'plm cocobau2' },
    ],
    userName: '',
    teamName: '',
    userEmail: '',
  }

  addUser = () => {
    this.setState(prev => ({
      userName: '',
      userEmail: '',
      users: [...prev.users, { email: prev.userEmail, name: prev.userName }],
    }))
  }

  changeInput = key => e => {
    this.setState({
      [key]: e.target.value,
    })
  }

  changeStep = val => () => {
    this.setState(prevState => ({
      step: prevState.step + val,
    }))
  }

  submit = () => {
    console.log(this.state)
  }

  toggleTopic = id => () => {
    this.setState(prev => ({
      topics: prev.topics.map(
        t => (t.id === id ? { ...t, selected: !t.selected } : t),
      ),
    }))
  }

  render() {
    const { step, topics, teamName, userEmail, userName, users } = this.state
    return (
      <Fragment>
        <Header as="h1">Create new team</Header>

        {step === 0 && (
          <TopicsStep
            topics={topics}
            teamName={teamName}
            toggleTopic={this.toggleTopic}
            changeTeamName={this.changeInput('teamName')}
          />
        )}
        {step === 1 && (
          <UsersStep
            users={users}
            name={userName}
            email={userEmail}
            addUser={this.addUser}
            changeInput={this.changeInput}
          />
        )}
        <Button.Group compact>
          {step !== 0 && <Button onClick={this.changeStep(-1)}>Back</Button>}
          <Button
            onClick={step === 0 ? this.changeStep(1) : this.submit}
            primary
          >
            {step === 0 ? 'Next' : 'Submit'}
          </Button>
        </Button.Group>
      </Fragment>
    )
  }
}

export default TeamCreation

// #region styles
const marginInput = css`
  margin: 15px 0;
`
// #endregion
