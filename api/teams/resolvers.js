const uuid = require('uuid')

module.exports = {
  Query: {
    teams: async (obj, args, { Team }) => {
      const teams = await Team.find()
      return teams
    },
  },
  Mutation: {
    addTeam: async (obj, { team }, { Team }) => {
      console.log(team)
      if (team.users) {
        team.users.forEach(user => {
          user.id = uuid.v4()
        })
      }
      const newTeam = new Team(team)
      return await newTeam.save()
    },
  },
}
