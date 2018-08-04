import React from 'react'
import { css } from 'emotion'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { omitBy, isNull } from 'lodash'
import { compose, withHandlers } from 'recompose'
import { Form as FinalForm } from 'react-final-form'
import { Container, Icon, Button, Divider } from 'semantic-ui-react'

import withSteps from './withSteps'
import { WizardHeader, Rating, Textarea } from './'
import * as sessionGQL from '../graphql/sessions'

const parseSessionValues = (values, teamId) => {
  const topics = Object.entries(values)
    .map(([topicId, el]) => [topicId, omitBy(el, isNull)])
    .reduce(
      (acc, [topicId, el]) => [
        ...acc,
        {
          ...el,
          topicId,
          votes: el.votes
            ? Object.entries(el.votes).map(([userId, value]) => ({
                userId,
                value,
              }))
            : [],
        },
      ],
      [],
    )
  return {
    teamId,
    topics,
  }
}

const ratingIcons = [
  { name: 'frown outline', value: -1, color: 'red' },
  { name: 'meh outline', value: 0, color: 'yellow' },
  { name: 'smile outline', value: 1, color: 'green' },
]

const trendIcons = [
  { name: 'arrow down', value: -1, color: 'red' },
  { name: 'arrow right', value: 0, color: 'yellow' },
  { name: 'arrow up', value: 1, color: 'green' },
]

const HealthCheckWizard = ({
  step,
  users,
  topics,
  nextStep,
  prevStep,
  submitVotingSession,
}) => {
  const topic = topics[step]
  return (
    <Container className={container}>
      <WizardHeader {...topic} />
      <Divider hidden />

      <Mutation mutation={sessionGQL.SUBMIT_SESSION_VOTE}>
        {mutateFn => (
          <FinalForm onSubmit={submitVotingSession(mutateFn)}>
            {({ handleSubmit, values }) => {
              return (
                <WizardContainer onSubmit={handleSubmit}>
                  <Icon
                    size="big"
                    name="arrow left"
                    disabled={step === 0}
                    onClick={prevStep}
                  />
                  <CustomList>
                    <Rating
                      label="Overall rating"
                      name={`${topic.id}.overall`}
                      icons={ratingIcons}
                    />

                    <Rating
                      label="Trend"
                      name={`${topic.id}.trend`}
                      icons={trendIcons}
                    />

                    <Divider />

                    {users.map(u => (
                      <Rating
                        key={u.id}
                        label={u.name}
                        icons={ratingIcons}
                        name={`${topic.id}.votes.${u.id}`}
                      />
                    ))}

                    <Textarea name={`${topic.id}.comments`} />

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
                    onClick={nextStep}
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

export default compose(
  withSteps,
  withHandlers({
    submitVotingSession: ({ teamId, goTo }) => mutateFn => values => {
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
    },
  }),
)(HealthCheckWizard)

// #region styles
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

const container = css`
  align-items: center !important;
  display: flex !important;
  flex-direction: column !important;
`
// #endregion
