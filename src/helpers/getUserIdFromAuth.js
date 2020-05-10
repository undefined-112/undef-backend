import { User } from "../models/User";

// helper 
const getUserIDFromToken = async (req) => {
  const bearerToken = req.header("Authorization");
  if (!bearerToken) {
    throw new Error("no access token provided");
  }
  const accessToken = bearerToken.split(" ")[1];
  const user = await User.findOne({ accessToken });

  return user._id;
};

export default getUserIDFromToken