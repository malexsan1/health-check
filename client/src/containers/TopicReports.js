import React from 'react'
import moment from 'moment'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import { Image, Icon } from 'semantic-ui-react'

import { GET_TEAM_WITH_SESSIONS } from '../graphql/teams'

const VoteIcon = ({ overall }) => {
  const icon =
    overall === -1
      ? { i: 'frown outline', color: 'red' }
      : overall === 0
        ? { i: 'meh outline', color: 'yellow' }
        : { i: 'smile outline', color: 'green' }
  return (
    <VoteBlock>
      <Icon name="circle" color={icon.color} size="big" />
    </VoteBlock>
  )
}

const TopicReports = ({ teamId }) => (
  <Query query={GET_TEAM_WITH_SESSIONS} variables={{ teamId }}>
    {({ data: { teamSessions = [], teamTopics = [] } }) => {
      return (
        <Root>
          <TopicsColumn>
            <DateBlock />
            {teamTopics.map(t => <Image key={t.id} src={t.icon} size="tiny" />)}
          </TopicsColumn>
          <VotesContainer>
            {teamSessions.map((session, index, arr) => (
              <VoteColumn key={`${session.id}-${index}`}>
                <DateBlock>
                  <span>{`#${arr.length - index}`}</span>
                  {moment(session.created).format('DD-MM:HH-mm')}
                </DateBlock>
                {session.topics.map(t => (
                  <VoteIcon key={t.topicId} overall={t.overall} />
                ))}
              </VoteColumn>
            ))}
          </VotesContainer>
        </Root>
      )
    }}
  </Query>
)

export default TopicReports

// #region styles
const Root = styled.div`
  display: flex;
  flex-direction: row;
`

const VotesContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: hidden;
`

const TopicsColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const VoteColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const VoteBlock = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  height: 80px;
  width: 80px;
`

const DateBlock = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80px;
  width: 80px;

  font-weight: 400;
  font-size: 0.8em;

  & span {
    font-size: 1.6em;
  }
`
// #endregion
