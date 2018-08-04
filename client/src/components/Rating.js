import React from 'react'
import { isEmpty } from 'lodash'
import styled from 'styled-components'
import { Field } from 'react-final-form'
import { Icon } from 'semantic-ui-react'
import { withHandlers } from 'recompose'

const Rating = ({
  name,
  changeVote,
  icons = [],
  iconSize = 'large',
  label = 'label here',
}) => (
  <Root>
    <Label>{label}</Label>
    <Votes>
      {icons.map(i => (
        <Field key={i.name} name={name}>
          {({ input: { onChange, value } }) => (
            <Icon
              size={iconSize}
              name={i.name}
              onClick={changeVote(i.value, value, onChange)}
              color={value === i.value ? i.color : null}
            />
          )}
        </Field>
      ))}
    </Votes>
  </Root>
)

export default withHandlers({
  changeVote: () => (voteValue, formValue, changeFn) => () => {
    if (formValue === voteValue || !isEmpty(formValue)) {
      changeFn(null)
    } else {
      changeFn(voteValue)
    }
  },
})(Rating)

// #region styles
const Root = styled.div`
  align-items: center;
  align-self: stretch;
  display: flex;
  margin: 1em 0;
  padding-right: 75px;
`

const Label = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  font-size: 1.2em;
  font-weight: 500;
`

const Votes = styled.div`
  align-items: center;
  flex: 2;
  display: flex;
  justify-content: space-around;
`
// #endregion
