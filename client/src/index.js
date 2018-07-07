import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloClient, InMemoryCache } from 'apollo-client-preset'

import App from './App'

const uri =
  process.env.NODE_ENV === 'production'
    ? `https://ts-health-check.herokuapp.com/graphql`
    : `http://localhost:4000/graphql`

const httpLink = createHttpLink({
  uri,
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})

ReactDOM.render(
  <Router>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById('root'),
)
