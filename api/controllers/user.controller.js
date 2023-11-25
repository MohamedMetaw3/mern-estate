import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.json({
    message: "Hello World",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) return next(errorHandler(401, "Invalid"));
  try {
    if (req.body.password) {
      req.body.password = bycryptjs.hashSync(req.body.password, 10);
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,       

      }
    },{new:true});
    const {password,...rest}=updateUser._doc
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
