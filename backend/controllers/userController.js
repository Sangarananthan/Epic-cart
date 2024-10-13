import { asyncHandler } from "../middlewares/asyncHandler.js";
import User from "../model/userModal.js";
import bcrypt from "bcryptjs";
import createTokens from "../utils/createTokens.js";
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    createTokens(res, newUser._id);
    res.status(201).json({
      _id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isValidPassword) {
      createTokens(res, existingUser._id);
      res.status(200).json({
        _id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
    }
  }
});

export { createUser, loginUser, logoutCurrentUser };
