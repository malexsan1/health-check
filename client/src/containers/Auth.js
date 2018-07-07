import React, { Fragment } from 'react'
import { css } from 'emotion'
import { Mutation } from 'react-apollo'
import { Route, Link } from 'react-router-dom'
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, Button, Icon, Divider } from 'semantic-ui-react'

import * as authActions from '../graphql/auth'

const emailRegex = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
const hasFieldError = ({ touched, active, error }) =>
  touched && !active && !!error

const loginValidation = ({ email, password }) => {
  const errors = {}
  if (!email) {
    errors.email = 'Email required.'
  }
  if (email && !emailRegex.test(email)) {
    errors.email = 'Invalid email.'
  }
  if (!password) {
    errors.password = 'Password required.'
  }
  return errors
}

const signupValidation = ({ email, password, confirmPassword }) => {
  const errors = loginValidation({ email, password })
  if (!confirmPassword) {
    errors.confirmPassword = 'Confirm password required.'
  }
  return errors
}

const Login = ({ history }) => (
  <Mutation mutation={authActions.LOGIN}>
    {mutateFn => (
      <FinalForm
        onSubmit={input =>
          mutateFn({ variables: { input } }).then(() =>
            history.replace(`/dashboard`),
          )
        }
        validate={loginValidation}
      >
        {({ handleSubmit, submitting }) => (
          <Form className={form} onSubmit={handleSubmit}>
            <Icon
              className={icon}
              name="arrow left"
              onClick={() => history.push('/')}
            />
            <Field name="email">
              {({ input, meta }) => {
                const hasError = hasFieldError(meta)
                return (
                  <Form.Field error={hasError}>
                    <label>Email</label>
                    <input {...input} />
                    {hasError && (
                      <span className={errorLabel}>{meta.error}</span>
                    )}
                  </Form.Field>
                )
              }}
            </Field>
            <Divider hidden />
            <Field name="password">
              {({ input, meta }) => {
                const hasError = hasFieldError(meta)
                return (
                  <Form.Field error={hasError}>
                    <label>Password</label>
                    <input type="password" {...input} />
                    {hasError && (
                      <span className={errorLabel}>{meta.error}</span>
                    )}
                  </Form.Field>
                )
              }}
            </Field>

            <Divider hidden />
            <Button primary type="submit" disabled={submitting}>
              Login
            </Button>
            <span>
              {`Don't have an account? `}
              <Link to="/signup">Sign up</Link>
            </span>
          </Form>
        )}
      </FinalForm>
    )}
  </Mutation>
)

const Signup = ({ history }) => (
  <Mutation mutation={authActions.SIGNUP}>
    {mutateFn => (
      <FinalForm
        onSubmit={input =>
          mutateFn({ variables: { input } }).then(() =>
            history.replace(`/dashboard`),
          )
        }
        validate={signupValidation}
      >
        {({ handleSubmit, submitting }) => (
          <Form className={form} onSubmit={handleSubmit}>
            <Icon className={icon} name="arrow left" onClick={history.goBack} />
            <Field name="email">
              {({ input, meta }) => {
                const hasError = hasFieldError(meta)
                return (
                  <Form.Field error={hasError}>
                    <label>Email</label>
                    <input {...input} />
                    {hasError && (
                      <span className={errorLabel}>{meta.error}</span>
                    )}
                  </Form.Field>
                )
              }}
            </Field>
            <Divider hidden />
            <Field name="password">
              {({ input, meta }) => {
                const hasError = hasFieldError(meta)
                return (
                  <Form.Field error={hasError}>
                    <label>Password</label>
                    <input type="password" {...input} />
                    {hasError && (
                      <span className={errorLabel}>{meta.error}</span>
                    )}
                  </Form.Field>
                )
              }}
            </Field>
            <Divider hidden />
            <Field name="confirmPassword">
              {({ input, meta }) => {
                const hasError = hasFieldError(meta)
                return (
                  <Form.Field error={hasError}>
                    <label>Password</label>
                    <input type="password" {...input} />
                    {hasError && (
                      <span className={errorLabel}>{meta.error}</span>
                    )}
                  </Form.Field>
                )
              }}
            </Field>
            <Divider hidden />
            <Button primary type="submit" disabled={submitting}>
              Sign up
            </Button>
          </Form>
        )}
      </FinalForm>
    )}
  </Mutation>
)

const Auth = ({ match: { path } }) => (
  <Fragment>
    <Route exact path="/" component={Login} />
    <Route path="/signup" component={Signup} />
  </Fragment>
)

export default Auth

// #region styles
const errorLabel = css`
  color: #9f3a38;
`
const icon = css`
  position: absolute;
  top: 5px;
  left: 5px;
`

const form = css`
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  max-width: 450px !important;
  padding: 20px 35px 20px 35px;
`
// #endregion
