
const { GraphQLNonNull, GraphQLString, GraphQLList } = require('graphql')
const TeamType = require('../types/team')
const TeamModel = require('../../models/team')
const UserType = require('../types/user').userType

exports.add = {
  type: TeamType.teamType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve: async (root, params) => {
    const teamModel = new TeamModel(params)
    const team = await teamModel.save()
    console.log(team)
    if (!team) {
      throw new Error('Error')
    }

    return team
  }
}