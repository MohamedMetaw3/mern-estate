import User from "../models/user.model.js";
import bycrptjs from "bcryptjs";

// sign up function ---------------->
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  //  hash password by bcyrptjs
  const salt = await bycrptjs.genSalt(10);
  const hashedPassword = bycrptjs.hashSync(password, salt);
  // create new user
  const newUser = new User({ username, email, password: hashedPassword });
  // handle success
  try {
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      newUser,
    });
    // handle error come from our Middleware
  } catch (error) {
    next(error);
  }
};
