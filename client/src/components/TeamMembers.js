import React, { Fragment } from 'react'
import { withHandlers } from 'recompose'
import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import { Form, Button, Icon } from 'semantic-ui-react'

const TextFormField = ({ label }) => formField => (
  <Form.Field>
    <label>{label}</label>
    <input {...formField.input} />
  </Form.Field>
)

const TeamMembers = ({ name, push, addMember, removeMember }) => (
  <Fragment>
    <Form.Field>
      <label>Team members</label>
      <Button icon labelPosition="right" onClick={addMember(name, push)}>
        <Icon name="add" />
        Add member
      </Button>
    </Form.Field>
    <FieldArray name={name}>
      {({ fields }) =>
        fields.map((name, index) => (
          <Form.Group key={name} widths="equal">
            <Form.Field width="1">
              <label>&nbsp;</label>
              <span>{`#${index + 1}`}</span>
            </Form.Field>
            <Field name={`${name}.email`} placeholder="Email">
              {TextFormField({ label: 'Email' })}
            </Field>
            <Field name={`${name}.name`} placeholder="Name">
              {TextFormField({ label: 'Name' })}
            </Field>

            <Form.Field width="2">
              <label>&nbsp;</label>
              <Button
                icon
                labelPosition="right"
                onClick={removeMember(index, fields.remove)}
              >
                Remove
                <Icon name="remove" />
              </Button>
            </Form.Field>
          </Form.Group>
        ))
      }
    </FieldArray>
  </Fragment>
)

export default withHandlers({
  addMember: () => (where, addFn) => e => {
    e.preventDefault()
    addFn(where, undefined)
  },
  removeMember: () => (index, removeFn) => e => {
    e.preventDefault()
    removeFn(index)
  },
})(TeamMembers)
