const uuid = require('uuid')

module.exports = {
  Query: {
    team: async (obj, { teamId }, { Team }) => {
      const team = await Team.findOne({ _id: teamId })
      return team
    },
    teams: async (obj, args, { Team }) => {
      const teams = await Team.find()
      return teams
    },
    teamForHealthCheck: async (obj, { teamId }, { Team }) => {
      const team = await Team.findOne({ _id: teamId })
      return team
    },
  },
  Mutation: {
    addTeam: async (obj, { team }, { Team }) => {
      if (team.users) {
        team.users.forEach(user => {
          user.id = uuid.v4()
        })
      }
      const newTeam = new Team(team)
      return await newTeam.save()
    },
  },
  HealthCheckTeam: {
    topics: async ({ topics }, args, { Topic }) => {
      const t = await Topic.find({
        _id: {
          $in: topics,
        },
      })
      return t
    },
  },
}
