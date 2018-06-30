module.exports = {
  Query: {
    teams: async (obj, args, { Team }) => {
      const teams = await Team.find()
      return teams
    },
  },
  Mutation: {
    addTeam: async (obj, { team }, { Team }) => {
      const newTeam = new Team(team)
      return await newTeam.save()
    },
  },
}
