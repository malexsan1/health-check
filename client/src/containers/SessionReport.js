import React, { Fragment } from 'react'
import { css } from 'emotion'
import { Query } from 'react-apollo'
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
              <Table.HeaderCell />
              <Table.HeaderCell width="3">
                <Icon name="frown outline" size="big" color="red" />
              </Table.HeaderCell>
              <Table.HeaderCell width="3">
                <Icon name="meh outline" size="big" color="yellow" />
              </Table.HeaderCell>
              <Table.HeaderCell width="3">
                <Icon name="smile outline" size="big" color="green" />
              </Table.HeaderCell>
              <Table.HeaderCell width="3">Overall</Table.HeaderCell>
              <Table.HeaderCell width="3">Trend</Table.HeaderCell>
            </Table.Header>

            <Table.Body>
              {session.topics.map(t => {
                const votes = t.votes.reduce(
                  (acc, el) => ({ ...acc, [el.value]: acc[el.value] + 1 }),
                  {
                    '-1': 0,
                    0: 0,
                    1: 0,
                  },
                )
                return (
                  <Table.Row key={t.topicId} textAlign="center">
                    <Table.Cell>
                      <Image src={t.details.icon} size="tiny" />
                      {t.details.name}
                    </Table.Cell>
                    <Table.Cell className={ratingText}>
                      {votes['-1']}
                    </Table.Cell>
                    <Table.Cell className={ratingText}>{votes['0']}</Table.Cell>
                    <Table.Cell className={ratingText}>{votes['1']}</Table.Cell>
                    <Table.Cell>
                      <OverallRating rating={t.overall} />
                    </Table.Cell>
                    <Table.Cell>
                      <Trend trend={t.trend} />
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
  return <Icon name={icon.name} size="big" color={icon.color} />
}

const Trend = ({ trend }) => {
  const icon =
    trend === -1
      ? { name: 'arrow down', color: 'red' }
      : trend === 0
        ? { name: 'arrow right', color: 'yellow' }
        : { name: 'arrow up', color: 'green' }
  return <Icon name={icon.name} size="big" color={icon.color} />
}

export default SessionReport

// #region styles
const ratingText = css`
  font-size: 1.6em;
`
// #endregion
