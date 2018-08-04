import React from 'react'
import { css, cx } from 'emotion'
import { Card, Image, Icon } from 'semantic-ui-react'

const TopicCard = ({ onChange, icon, value, bestCase, worstCase, name }) => (
  <Card onClick={onChange} className={cx(topicCard, value && selectedTopic)}>
    <Image src={icon} className={topicImage} />
    <Card.Content className={cardContent}>
      <Card.Header>{name}</Card.Header>
      <Card.Description className={cardDescription}>
        <Icon size="big" name="smile outline" color="green" />
        <span>{bestCase}</span>
      </Card.Description>
      <Card.Description className={cardDescription}>
        <Icon size="big" name="frown outline" color="red" />
        <span>{worstCase}</span>
      </Card.Description>
    </Card.Content>
  </Card>
)

export default TopicCard

// #region styles
const cardContent = css`
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
`

const cardDescription = css`
  align-items: center;
  display: flex;

  span {
    margin-left: 1em;
  }
`

const topicCard = css`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const selectedTopic = css`
  background-color: rgba(33, 133, 208, 0.2) !important;
`

const topicImage = css`
  background: transparent !important;
  margin: 1em;
  height: 150px;
  width: 150px;
`
// #endregion
