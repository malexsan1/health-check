import React, { Fragment } from 'react'
import { withHandlers } from 'recompose'
import arrayMutators from 'final-form-arrays'
import { Query, Mutation } from 'react-apollo'
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, Icon, Header, Button, Divider } from 'semantic-ui-react'

import * as teamsGQL from '../graphql/teams'
import * as topicsGQL from '../graphql/topics'
import { TeamTopics, TeamMembers } from '../components'

const parseFormValues = ({ name = '', users = [], ...topics }) => {
  return {
    name,
    users: users.filter(Boolean),
    topics: Object.entries(topics)
      .filter(([key, value]) => value)
      .map(([key, value]) => key),
  }
}

const TeamCreation = ({
  submit,
  history: { goBack },
  getFormInitialValues,
}) => (
  <Fragment>
    <Header as="h1">
      <Icon name="arrow left" onClick={goBack} />
      <Header.Content>Create team</Header.Content>
    </Header>
    <Divider />
    <Query query={topicsGQL.GET_TOPICS}>
      {({ data: { topics = [] }, loading }) => {
        return loading ? (
          <span>loading...</span>
        ) : (
          <Mutation mutation={teamsGQL.ADD_TEAM}>
            {mutateFn => (
              <FinalForm
                onSubmit={submit(mutateFn)}
                mutators={{ ...arrayMutators }}
                initialValues={getFormInitialValues(topics)}
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
                        {({ input }) => (
                          <Form.Field>
                            <label>Team name</label>
                            <input {...input} />
                          </Form.Field>
                        )}
                      </Field>
                      <Form.Field>
                        <label>Topics</label>
                      </Form.Field>

                      <TeamTopics topics={topics} />
                      <TeamMembers name="users" push={push} />

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

export default withHandlers({
  submit: ({ history: { goBack } }) => mutateFn => values => {
    mutateFn({ variables: { team: parseFormValues(values) } }).then(goBack)
  },
  getFormInitialValues: () => (topics = []) => {
    const t = topics.reduce((acc, el) => ({ ...acc, [el.id]: false }), {})
    return {
      ...t,
      name: '',
    }
  },
})(TeamCreation)
