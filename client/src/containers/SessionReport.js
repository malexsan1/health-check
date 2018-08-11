import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import Markdown from 'react-markdown'
import styled from 'styled-components'
import { css } from 'emotion'
import { Table, Icon, Image } from 'semantic-ui-react'

import * as sessionsGQL from '../graphql/sessions'

const SessionReport = ({
  match: {
    params: { sessionId },
  },
}) => (
  <Query query={sessionsGQL.GET_SESSION} variables={{ sessionId }}>
    {({ data: { sessionById: session }, loading }) =>
      loading ? (
        <span>Loading ...</span>
      ) : (
        <Fragment>
          <Table textAlign="center" definition>
            <Table.Header>
              <Table.HeaderCell width="2" />
              <Table.HeaderCell width="2">Overall</Table.HeaderCell>
              <Table.HeaderCell width="2">Trend</Table.HeaderCell>
              <Table.HeaderCell width="6">Comments</Table.HeaderCell>
            </Table.Header>

            <Table.Body>
              {session.topics.map(t => {
                return (
                  <Table.Row key={t.topicId} textAlign="center">
                    <Table.Cell>
                      <TopicInfo>
                        <Image src={t.details.icon} size="tiny" />
                        {t.details.name}
                      </TopicInfo>
                    </Table.Cell>
                    <Table.Cell>
                      <OverallRating rating={t.overall} />
                    </Table.Cell>
                    <Table.Cell>
                      <Trend trend={t.trend} />
                    </Table.Cell>
                    <Table.Cell>
                      <Markdown className={markdown} source={t.comments} />
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        </Fragment>
      )
    }
  </Query>
)

const OverallRating = ({ rating }) => {
  const icon =
    rating === -1
      ? { name: 'frown outline', color: 'red' }
      : rating === 0
        ? { name: 'meh outline', color: 'yellow' }
        : { name: 'smile outline', color: 'green' }
  return <Icon name="circle" size="big" color={icon.color} />
}

const Trend = ({ trend }) => {
  const icon =
    trend === -1
      ? { name: 'arrow down', color: 'red' }
      : trend === 0
        ? { name: 'arrow right', color: 'yellow' }
        : { name: 'arrow up', color: 'green' }
  return <Icon name={icon.name} size="big" />
}

export default SessionReport

// #region styles
const TopicInfo = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const markdown = css`
  & li {
    text-align: left;
  }
`
// #endregion
