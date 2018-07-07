const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  Mutation: {
    login: async (_, { input: { email: inputEmail, password } }, { User }) => {
      const { id, email, passwordHash } = await User.findOne({
        email: inputEmail,
      })
      const validPassword = await bcrypt.compare(password, passwordHash)

      if (validPassword) {
        const token = jwt.sign({ email }, 'secretulvietii', {
          expiresIn: '1 day',
        })

        return {
          id,
          email,
          token,
        }
      }
    },
    signUp: async (_, { input: { email, password } }, { User }) => {
      const passwordHash = await bcrypt.hash(password, 10)
      const token = jwt.sign({ email }, 'secretulvietii', {
        expiresIn: '1 day',
      })
      const user = new User({
        email,
        passwordHash,
      })
      const { id } = await user.save()
      return {
        id,
        email,
        token,
      }
    },
  },
}
