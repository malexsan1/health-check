module.exports = {
  Query: {
    topics: async (obj, args, { Topic }) => {
      const topics = await Topic.find()
      return topics
    },
    teamTopics: async (obj, { teamId }, { Topic, Team }) => {
      const { topics: teamTopics } = await Team.findOne({ _id: teamId })
      return await Topic.find({
        _id: {
          $in: teamTopics,
        },
      })
    },
  },
  Mutation: {
    addTopic: async (obj, { topic }, { Topic }) => {
      const newTopic = new Topic(topic)
      return await newTopic.save()
    },
  },
}
