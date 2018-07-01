import React, { Component, Fragment } from 'react'
import { css, cx } from 'emotion'
import arrayMutators from 'final-form-arrays'
import { Query, Mutation } from 'react-apollo'
import { FieldArray } from 'react-final-form-arrays'
import { Form as FinalForm, Field } from 'react-final-form'
import {
  Card,
  Form,
  Icon,
  Image,
  Header,
  Button,
  Divider,
  Checkbox,
} from 'semantic-ui-react'

import * as topicsGQL from '../graphql/topics'
import * as teamsGQL from '../graphql/teams'

const happyFaceURL = `http://www.clker.com/cliparts/d/E/Y/K/Q/E/happy-green-face-th.png`
const sadFaceURL = `http://aviewfromtheright.com/wp-content/uploads/2012/11/red-sad-face-150x150.png`

const parseFormValues = ({ name = '', users = [], ...topics }) => {
  return {
    name,
    users: users.filter(Boolean),
    topics: Object.entries(topics)
      .filter(([key, value]) => value)
      .map(([key, value]) => key),
  }
}

class TeamCreation extends Component {
  submit = mutateFn => values => {
    const { history } = this.props
    mutateFn({ variables: { team: parseFormValues(values) } }).then(
      history.goBack,
    )
  }

  getFormInitialValues = (topics = []) => {
    const t = topics.reduce((acc, el) => ({ ...acc, [el.id]: false }), {})
    return {
      ...t,
      name: '',
    }
  }

  render() {
    const { goBack } = this.props.history
    return (
      <Fragment>
        <Header as="h1">
          <Icon name="arrow left" onClick={goBack} />
          <Header.Content>Create team</Header.Content>
        </Header>
        <Divider />
        <Query query={topicsGQL.GET_TOPICS}>
          {({ data, loading }) => {
            return loading ? (
              <span>loading...</span>
            ) : (
              <Mutation mutation={teamsGQL.ADD_TEAM}>
                {mutateFn => (
                  <FinalForm
                    onSubmit={this.submit(mutateFn)}
                    mutators={{ ...arrayMutators }}
                    initialValues={this.getFormInitialValues(data.topics)}
                  >
                    {({
                      handleSubmit,
                      form: {
                        mutators: { push },
                      },
                    }) => {
                      return (
                        <Form onSubmit={handleSubmit}>
                          <Field name="name">
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
                          <Card.Group centered itemsPerRow={3}>
                            {data.topics &&
                              data.topics.map(t => (
                                <Field key={t.id} name={t.id}>
                                  {({ input }) => {
                                    return (
                                      <Checkbox
                                        checked={input.value}
                                        onChange={(e, { checked }) =>
                                          input.onChange(checked)
                                        }
                                        as={({ onChange }) => (
                                          <Card
                                            onClick={onChange}
                                            className={cx(
                                              topicCard,
                                              input.value && selectedTopic,
                                            )}
                                          >
                                            <Image
                                              src={t.icon}
                                              className={topicImage}
                                            />
                                            <Card.Content
                                              className={cardContent}
                                            >
                                              <Card.Header>
                                                {t.name}
                                              </Card.Header>
                                              <Card.Description
                                                className={cardDescription}
                                              >
                                                <Image
                                                  size="mini"
                                                  src={happyFaceURL}
                                                />
                                                <span>{t.bestCase}</span>
                                              </Card.Description>
                                              <Card.Description
                                                className={cardDescription}
                                              >
                                                <Image
                                                  size="mini"
                                                  src={sadFaceURL}
                                                />
                                                <span>{t.worstCase}</span>
                                              </Card.Description>
                                            </Card.Content>
                                          </Card>
                                        )}
                                      />
                                    )
                                  }}
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
                                  <Field
                                    name={`${name}.email`}
                                    placeholder="Email"
                                  >
                                    {formField => (
                                      <Form.Field>
                                        <label>Email</label>
                                        <input {...formField.input} />
                                      </Form.Field>
                                    )}
                                  </Field>
                                  <Field
                                    name={`${name}.name`}
                                    placeholder="Name"
                                  >
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
                )}
              </Mutation>
            )
          }}
        </Query>
      </Fragment>
    )
  }
}

export default TeamCreation

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
