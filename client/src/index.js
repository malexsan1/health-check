import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloClient, InMemoryCache } from 'apollo-client-preset'

import App from './App'

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({ uri: `http://localhost:4000/graphql` }),
})

ReactDOM.render(
  <Router>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById('root'),
)
