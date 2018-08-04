import React from 'react'
import { Field } from 'react-final-form'
import { Card, Checkbox } from 'semantic-ui-react'

import { TopicCard } from './'

const TeamTopics = ({ topics = [] }) => (
  <Card.Group centered itemsPerRow={3}>
    {topics.map(topic => (
      <Field key={topic.id} name={topic.id}>
        {({ input: { value, onChange } }) => {
          return (
            <Checkbox
              checked={value}
              onChange={(e, { checked }) => onChange(checked)}
              as={({ onChange }) => (
                <TopicCard onChange={onChange} value={value} {...topic} />
              )}
            />
          )
        }}
      </Field>
    ))}
  </Card.Group>
)

export default TeamTopics
