import React from 'react'
import { css } from 'emotion'
import Markdown from 'react-markdown'
import styled from 'styled-components'
import { Field } from 'react-final-form'
import { withStateHandlers } from 'recompose'
import { Button, Form, TextArea } from 'semantic-ui-react'

const Textarea = ({ label = 'Comments', name, preview, togglePreview }) => (
  <Root>
    <Label>
      <span>{label}</span>
      <Button basic onClick={togglePreview}>
        {preview ? 'Show comments' : 'Preview markdown'}
      </Button>
    </Label>
    <Field name={name}>
      {({ input: { value, onChange } }) =>
        preview ? (
          <Markdown className={formCss} source={value} />
        ) : (
          <Form className={formCss}>
            <TextArea autoHeight onChange={onChange} value={value} />
          </Form>
        )
      }
    </Field>
  </Root>
)

export default withStateHandlers(
  { preview: false },
  {
    togglePreview: ({ preview }) => e => {
      e.preventDefault()
      return {
        preview: !preview,
      }
    },
  },
)(Textarea)

// #region styles
const formCss = css`
  flex: 1;
`

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
  justify-content: space-between;
  margin-bottom: 3px;
`
// #endregion
