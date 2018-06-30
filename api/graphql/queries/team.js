
const { GraphQLObjectType, GraphQLList } = require('graphql')
const TeamModel = require('../../models/team')
const teamType = require('../types/team').teamType

// Query
exports.queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    teams: {
      type: new GraphQLList(teamType),
      resolve: () => {
        const teams = TeamModel.find().exec()
        if (!teams) {
          throw new Error('Error')
        }
        return teams
      }
    }
  })
})