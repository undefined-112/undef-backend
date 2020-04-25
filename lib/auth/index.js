import { User } from '../../Models/User'

const auth = async (req, res, next) => {
  try {
    const authToken = req.header('Authorization')
    const hasToken = await User.findOne({ accessToken: authToken })
    if (hasToken) {
      next()
    } else {
      // throw new createError(403, 'you are not authorized to access this') // TODO fix status code in error handling
      throw new Error('you are not authorized')
    }
  } catch (err) {
    next(err)
  }
}

export default auth
