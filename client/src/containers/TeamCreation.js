import React, { Component, Fragment } from 'react'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import { Form as FinalForm, Field } from 'react-final-form'
import { Card, Form, Header, Button, Checkbox, Icon } from 'semantic-ui-react'

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

class TeamCreation extends Component {
  submit = values => {
    console.log(values)
  }

  getFormInitialValues = () => {
    const t = topics.reduce((acc, el) => ({ ...acc, [el.id]: false }), {})
    return {
      ...t,
      team: 'lala',
    }
  }

  render() {
    return (
      <Fragment>
        <Header as="h1">Create team</Header>
        <FinalForm
          onSubmit={this.submit}
          mutators={{ ...arrayMutators }}
          initialValues={this.getFormInitialValues()}
        >
          {({
            handleSubmit,
            form: {
              mutators: { push },
            },
          }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <Field name="team">
                  {formField => (
                    <Form.Field>
                      <label>Team name</label>
                      <input {...formField.input} />
                    </Form.Field>
                  )}
                </Field>
                <Form.Field>
                  <label>Topics</label>
                </Form.Field>
                <Card.Group centered itemsPerRow={4}>
                  {topics.map(t => (
                    <Field key={t.id} name={t.id}>
                      {({ input }) => (
                        <Checkbox
                          key={t.id}
                          checked={input.value}
                          onChange={(e, { checked }) => input.onChange(checked)}
                          as={({ onChange }) => (
                            <Card
                              key={t.id}
                              color={input.value ? 'blue' : null}
                              onClick={onChange}
                            >
                              <Card.Content>
                                <Card.Header>{t.name}</Card.Header>
                                <Card.Description>
                                  {t.description}
                                </Card.Description>
                              </Card.Content>
                            </Card>
                          )}
                        />
                      )}
                    </Field>
                  ))}
                </Card.Group>
                <Form.Field>
                  <label>Team members</label>
                  <Button
                    icon
                    labelPosition="right"
                    onClick={e => {
                      e.preventDefault()
                      push('users', undefined)
                    }}
                  >
                    <Icon name="add" />
                    Add member
                  </Button>
                </Form.Field>
                <FieldArray name="users">
                  {({ fields }) =>
                    fields.map((name, index) => (
                      <Form.Group key={name} widths="equal">
                        <Form.Field width="1">
                          <label>&nbsp;</label>
                          <span>{`#${index + 1}`}</span>
                        </Form.Field>
                        <Field name={`${name}.email`} placeholder="Email">
                          {formField => (
                            <Form.Field>
                              <label>Email</label>
                              <input {...formField.input} />
                            </Form.Field>
                          )}
                        </Field>
                        <Field name={`${name}.name`} placeholder="Name">
                          {formField => (
                            <Form.Field>
                              <label>Name</label>
                              <input {...formField.input} />
                            </Form.Field>
                          )}
                        </Field>
                        <Form.Field width="2">
                          <label>&nbsp;</label>
                          <Button
                            icon
                            labelPosition="right"
                            onClick={e => {
                              e.preventDefault()
                              fields.remove(index)
                            }}
                          >
                            Remove
                            <Icon name="remove" />
                          </Button>
                        </Form.Field>
                      </Form.Group>
                    ))
                  }
                </FieldArray>
                <Button type="submit" primary size="big">
                  Submit
                </Button>
              </Form>
            )
          }}
        </FinalForm>
      </Fragment>
    )
  }
}

export default TeamCreation
