const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString } = require('graphql')

// user Type
exports.userType = new GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
  })
})