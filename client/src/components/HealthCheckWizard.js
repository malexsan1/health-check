import React, { Component } from 'react'
import { css } from 'emotion'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { Form as FinalForm, Field } from 'react-final-form'
import { Container, Item, Icon, Button, Divider, Grid } from 'semantic-ui-react'

import * as sessionGQL from '../graphql/sessions'

const parseSessionValues = (values, teamId) => {
  const topics = Object.entries(values).reduce(
    (acc, [topicId, el]) => [
      ...acc,
      {
        ...el,
        topicId,
        votes: Object.entries(el.votes).map(([userId, value]) => ({
          userId,
          value,
        })),
      },
    ],
    [],
  )
  return {
    teamId,
    topics,
  }
}
class HealthCheckWizard extends Component {
  state = {
    step: 0,
  }

  prevStep = () => {
    this.setState(prev => ({
      step: Math.max(0, prev.step - 1),
    }))
  }

  nextStep = () => {
    const { topics } = this.props
    this.setState(prev => ({
      step: Math.min(topics.length - 1, prev.step + 1),
    }))
  }

  submitVotingSession = mutateFn => values => {
    const { teamId, goTo } = this.props
    const votingSession = parseSessionValues(values, teamId)
    mutateFn({ variables: { session: votingSession } }).then(
      ({
        data: {
          submitVote: { id: sessionId },
        },
      }) => {
        goTo(`/team/${teamId}/session/${sessionId}`)
      },
    )
  }

  render() {
    const {
      props: { topics, users },
      state: { step },
    } = this
    const t = topics[step]
    return (
      <Container className={container}>
        <Grid columns={3}>
          <Grid.Column
            textAlign="right"
            verticalAlign="middle"
            className={worstCaseText}
          >
            {t.worstCase}
          </Grid.Column>
          <Grid.Column>
            <Item className={missionItem}>
              <Item.Image src={t.icon} size="small" />
              <Item.Content className={iconContent}>
                <Item.Header>{t.name}</Item.Header>
              </Item.Content>
            </Item>
          </Grid.Column>
          <Grid.Column verticalAlign="middle" className={bestCaseText}>
            {t.bestCase}
          </Grid.Column>
        </Grid>
        <Divider hidden />

        <Mutation mutation={sessionGQL.SUBMIT_SESSION_VOTE}>
          {mutateFn => (
            <FinalForm onSubmit={this.submitVotingSession(mutateFn)}>
              {({ handleSubmit }) => {
                return (
                  <WizardContainer onSubmit={handleSubmit}>
                    <Icon
                      size="big"
                      name="arrow left"
                      disabled={step === 0}
                      onClick={this.prevStep}
                    />
                    <CustomList>
                      <ListRow>
                        <ListUser>Overall rating</ListUser>
                        <Ratings>
                          <Field name={`${t.id}.overall`}>
                            {({ input: { onChange, value } }) => (
                              <Icon
                                size="large"
                                onClick={() => onChange(-1)}
                                color={value === -1 ? 'red' : null}
                                name={value === -1 ? 'circle' : 'frown outline'}
                              />
                            )}
                          </Field>
                          <Field name={`${t.id}.overall`}>
                            {({ input: { onChange, value } }) => (
                              <Icon
                                size="large"
                                onClick={() => onChange(0)}
                                color={value === 0 ? 'yellow' : null}
                                name={value === 0 ? 'circle' : 'meh outline'}
                              />
                            )}
                          </Field>
                          <Field name={`${t.id}.overall`}>
                            {({ input: { onChange, value } }) => (
                              <Icon
                                size="large"
                                onClick={() => onChange(1)}
                                color={value === 1 ? 'green' : null}
                                name={value === 1 ? 'circle' : 'smile outline'}
                              />
                            )}
                          </Field>
                        </Ratings>
                      </ListRow>
                      <ListRow>
                        <ListUser>Trend</ListUser>
                        <Ratings>
                          <Field name={`${t.id}.trend`}>
                            {({ input: { onChange, value } }) => (
                              <Icon
                                size="large"
                                name="arrow down"
                                onClick={() => onChange(-1)}
                                color={value === -1 ? 'red' : null}
                              />
                            )}
                          </Field>
                          <Field name={`${t.id}.trend`}>
                            {({ input: { onChange, value } }) => (
                              <Icon
                                size="large"
                                name="arrow right"
                                onClick={() => onChange(0)}
                                color={value === 0 ? 'yellow' : null}
                              />
                            )}
                          </Field>
                          <Field name={`${t.id}.trend`}>
                            {({ input: { onChange, value } }) => (
                              <Icon
                                size="large"
                                name="arrow up"
                                onClick={() => onChange(1)}
                                color={value === 1 ? 'green' : null}
                              />
                            )}
                          </Field>
                        </Ratings>
                      </ListRow>
                      <Divider />
                      {users.map(u => (
                        <ListRow key={u.id}>
                          <ListUser>{u.name}</ListUser>
                          <Ratings>
                            <Field name={`${t.id}.votes.${u.id}`}>
                              {({ input: { onChange, value } }) => (
                                <Icon
                                  size="large"
                                  name="frown outline"
                                  onClick={() => onChange(-1)}
                                  color={value === -1 ? 'red' : null}
                                />
                              )}
                            </Field>
                            <Field name={`${t.id}.votes.${u.id}`}>
                              {({ input: { onChange, value } }) => (
                                <Icon
                                  size="large"
                                  name="meh outline"
                                  onClick={() => onChange(0)}
                                  color={value === 0 ? 'yellow' : null}
                                />
                              )}
                            </Field>
                            <Field name={`${t.id}.votes.${u.id}`}>
                              {({ input: { onChange, value } }) => (
                                <Icon
                                  size="large"
                                  name="smile outline"
                                  onClick={() => onChange(1)}
                                  color={value === 1 ? 'green' : null}
                                />
                              )}
                            </Field>
                          </Ratings>
                        </ListRow>
                      ))}
                      <Button
                        primary
                        type="submit"
                        disabled={step !== topics.length - 1}
                      >
                        Submit
                      </Button>
                    </CustomList>
                    <Icon
                      disabled={step === topics.length - 1}
                      size="big"
                      name="arrow right"
                      onClick={this.nextStep}
                    />
                  </WizardContainer>
                )
              }}
            </FinalForm>
          )}
        </Mutation>
      </Container>
    )
  }
}

export default HealthCheckWizard

// #region styles
const worstCaseText = css`
  border-right: 5px solid red;
  font-size: 1.2em;
  padding-right: 1em;
`

const bestCaseText = css`
  border-left: 5px solid green;
  font-size: 1.2em;
  padding-left: 1em;
`

const WizardContainer = styled.form`
  align-self: stretch;
  align-items: center;
  display: flex;
`

const CustomList = styled.div`
  align-items: center;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 1em 0;
`

const ListRow = styled.div`
  align-items: center;
  align-self: stretch;
  display: flex;
  margin: 1em 0;
  padding-right: 75px;
`

const ListUser = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  font-size: 1.2em;
  font-weight: 500;
`

const Ratings = styled.div`
  align-items: center;
  flex: 2;
  display: flex;
  justify-content: space-around;
`

const missionItem = css`
  text-align: center;
`

const container = css`
  align-items: center !important;
  display: flex !important;
  flex-direction: column !important;
`

const iconContent = css`
  font-size: 1.4em;
  font-weight: 600;
  text-align: center;
`
// #endregion
