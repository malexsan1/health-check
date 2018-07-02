module.exports = {
  Mutation: {
    submitVote: async (obj, { session }, { Session }) => {
      const s = new Session(session)
      await s.save()
      return s
    },
  },
  Query: {
    sessions: async(obj, args, { Session} ) => {
      const sessions = await Session.find()
      return sessions
    },
    sessionById: async (obj, { sessionId }, { Session }) => {
      const session = await Session.findById(sessionId)
      return session
    },
    teamSessions: async (obj, { teamId }, { Session }) => {
      const sessions = await Session.find({ teamId })
      return sessions
    }
  },
  SessionTopic: {
    details: async ( { topicId }, args, { Topic }) => {
      const topic = await Topic.findById(topicId)
      return topic
    }
  }
}
