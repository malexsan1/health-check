module.exports = {
  Query: {
    topics: async (obj, args, { Topic }) => {
      const topics = await Topic.find()
      return topics
    },
  },
  Mutation: {
    addTopic: async (obj, { topic }, { Topic }) => {
      const newTopic = new Topic(topic)
      return await newTopic.save()
    },
  },
}
