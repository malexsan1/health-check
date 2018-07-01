import React, { Component } from 'react'
import { css } from 'emotion'
import styled from 'styled-components'
import { Form as FinalForm, Field } from 'react-final-form'
import { Container, Item, Icon, Button } from 'semantic-ui-react'

class HealthCheckWizard extends Component {
  state = {
    step: 0,
  }

  prevStep = () => {
    this.setState(prev => ({
      step: Math.max(0, prev.step - 1),
    }))
  }

  nextStep = () => {
    const { topics } = this.props
    this.setState(prev => ({
      step: Math.min(topics.length - 1, prev.step + 1),
    }))
  }

  render() {
    const {
      props: { topics, users },
      state: { step },
    } = this
    const t = topics[step]
    return (
      <Container className={container}>
        <Item>
          <Item.Image src={t.icon} size="tiny" />
          <Item.Content className={iconContent}>
            <Item.Header>{t.name}</Item.Header>
          </Item.Content>
        </Item>

        <FinalForm onSubmit={values => console.log('form values -> ', values)}>
          {({ handleSubmit }) => {
            return (
              <WizardContainer onSubmit={handleSubmit}>
                <Icon
                  size="big"
                  name="arrow left"
                  disabled={step === 0}
                  onClick={this.prevStep}
                />
                <CustomList>
                  {users.map(u => (
                    <ListRow key={u.id}>
                      <ListUser>{u.name}</ListUser>
                      <Ratings>
                        <Field name={`${t.id}.${u.id}`}>
                          {({ input: { onChange, value } }) => (
                            <Icon
                              size="big"
                              name="frown outline"
                              onClick={() => onChange(-1)}
                              color={value === -1 ? 'red' : null}
                            />
                          )}
                        </Field>
                        <Field name={`${t.id}.${u.id}`}>
                          {({ input: { onChange, value } }) => (
                            <Icon
                              size="big"
                              name="meh outline"
                              onClick={() => onChange(0)}
                              color={value === 0 ? 'yellow' : null}
                            />
                          )}
                        </Field>
                        <Field name={`${t.id}.${u.id}`}>
                          {({ input: { onChange, value } }) => (
                            <Icon
                              size="big"
                              name="smile outline"
                              onClick={() => onChange(1)}
                              color={value === 1 ? 'green' : null}
                            />
                          )}
                        </Field>
                      </Ratings>
                    </ListRow>
                  ))}
                  <Button
                    primary
                    type="submit"
                    // disabled={step !== topics.length - 1}
                  >
                    Submit
                  </Button>
                </CustomList>
                <Icon disabled={step === topics.length - 1} size="big" name="arrow right" onClick={this.nextStep} />
              </WizardContainer>
            )
          }}
        </FinalForm>
      </Container>
    )
  }
}

export default HealthCheckWizard

// #region styles
const WizardContainer = styled.form`
  align-self: stretch;
  align-items: center;
  display: flex;
`

const CustomList = styled.div`
  align-items: center;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 1em 0;
`

const ListRow = styled.div`
  align-items: center;
  align-self: stretch;
  display: flex;
  margin: 1em 0;
  padding-right: 75px;
`

const ListUser = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  font-size: 1.6em;
  font-weight: 500;
`

const Ratings = styled.div`
  align-items: center;
  flex: 2;
  display: flex;
  justify-content: space-around;
`

const container = css`
  align-items: center !important;
  display: flex !important;
  flex-direction: column !important;
`

const iconContent = css`
  font-size: 1.2em;
  font-weight: 600;
  text-align: center;
`
// #endregion
