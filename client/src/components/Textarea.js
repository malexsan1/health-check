import React from 'react'
import styled from 'styled-components'
import { Form, TextArea } from 'semantic-ui-react'
import { Field } from 'react-final-form'

const Textarea = ({ label = 'Comments', name }) => (
  <Root>
    <Label>{label}</Label>
    <Field name={name}>
      {({ input: { value, onChange } }) => (
        <Form>
          <TextArea autoHeight onChange={onChange} value={value} />
        </Form>
      )}
    </Field>
  </Root>
)

export default Textarea

// #region styles
const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  margin: 20px 0;
  width: 100%;
`

const Label = styled.div`
  display: flex;
  flex: 1;
  font-size: 1.3em;
  font-weight: 600;
  justify-content: flex-start;
  margin: 10px 0;
`
// #endregion
