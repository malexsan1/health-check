module.exports = {
  Mutation: {
    submitVote: async (obj, { session }, { Session }) => {
      const s = new Session(session)
      await s.save()
      return s
    },
  },
}
