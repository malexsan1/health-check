import React, { Fragment } from 'react'
import moment from 'moment'
import { css, cx } from 'emotion'
import { Header, Card } from 'semantic-ui-react'

const PreviousSessions = ({
  selectSession,
  selectedSession,
  teamSessions = [],
}) =>
  teamSessions.length > 0 ? (
    <Fragment>
      <Header as="h2">
        <Header.Content>Previous sessions reports</Header.Content>
      </Header>
      <Card.Group itemsPerRow={4}>
        {teamSessions.map((session, index) => (
          <Card
            key={session.id}
            className={cx(selectedSession === session.id && selected)}
            onClick={selectSession(session)}
          >
            <Card.Content>
              <Card.Header>{`Session #${index + 1}`}</Card.Header>
              <Card.Content>
                {moment(session.created).format(`DD/MM/YYYY`)}
              </Card.Content>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Fragment>
  ) : (
    <span>Start a new health check session!</span>
  )

export default PreviousSessions

// #region styles
const selected = css`
  background-color: rgba(33, 133, 208, 0.2) !important;
`
// #endregion
