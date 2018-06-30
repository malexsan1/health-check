const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList } = require('graphql')
const UserType = require('./user').userType

// Team Type
exports.teamType = new GraphQLObjectType({
  name: 'team',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLString
    },
    users: {
      type: GraphQLList(UserType)
    },
    topics: {
      type: GraphQLList(GraphQLID)
    }
  })
})