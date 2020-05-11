import { User } from "../models/User"

const auth = async (req, res, next) => {
  try {
    const bearerToken = req.header("Authorization")
    if (!bearerToken) {
      throw new Error("no access token provided")
    }
    
    const accessToken = bearerToken.split(" ")[1]
    const hasToken = await User.findOne({ accessToken })
    if (hasToken) {
      next()
    } else {
      // throw new createError(403, 'you are not authorized to access this') // TODO fix status code in error handling
      throw new Error("you are not authorized")
    }
  } catch (err) {
    next(err)
  }
}

export default auth
