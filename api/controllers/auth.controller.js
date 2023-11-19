import User from "../models/user.model.js";
import bycrptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

// sign in function ---------------->

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User?.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const isMatchPassword = bycrptjs.compareSync(password, validUser?.password);
    if (!isMatchPassword) {
      return res.status(401).json({
        message: "Password is incorrect",
      });
    }
    const token = jwt.sign({ _id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);

    res.status(200).json({
      message: "User logged in successfully",
      validUser,
    });
  } catch (error) {
    next(error);
  }
};
