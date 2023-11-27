import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

// test function------------------------>
export const test = (req, res) => {
  res.json({
    message: "Hello World",
  });
};

// Update User function------------------------>
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(
      errorHandler(
        401,
        "you can only update a user with this id in the database if the user already exists and has permission   to update it."
      )
    );
  try {
    if (req.body.password) {
      req.body.password = bycryptjs.hashSync(req.body.password, 10);
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,

      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


// Delet User function------------------------>
export const deleteUser = async (req, res, next) => {
  if (req.user.id!== req.params.id)
    return next(
      errorHandler(
        401,
        "you can only delete a user with this id in the database if the user already exists and has permission   to delete it."
      )
    );
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("user already deleted");
  } catch (error) {
    next(error);
  }
}