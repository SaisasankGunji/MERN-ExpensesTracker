const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const usersController = {
  //! Register
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Validate
    if (!username || !email || !password) {
      throw new Error("Please all fields are required");
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const userCreated = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    // Send the response
    res.json({
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated._id,
    });
  }),

  //! Login
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if email is valid
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid login credentials");
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid login credentials");
    }

    // Generate a token
    const token = jwt.sign({ id: user._id }, "saisasankKey", {
      expiresIn: "10000d",
    });

    // Send the response
    res.json({
      message: "Login Success",
      token,
      id: user._id,
      email: user.email,
      username: user.username,
    });
  }),

  //! Profile
  profile: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }
    res.json({ username: user.username, email: user.email });
  }),

  //! Change Password
  changeUserPassword: asyncHandler(async (req, res) => {
    const { newPassword } = req.body;

    // Find the user
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the password
    user.password = hashedPassword;
    await user.save({ validateBeforeSave: false });

    // Send the response
    res.json({ message: "Password Changed successfully" });
  }),

  //! Update Profile
  updateUserProfile: asyncHandler(async (req, res) => {
    const { email, username } = req.body;

    // Update the user profile
    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      { username, email },
      { new: true }
    );

    // Send the response
    res.json({ message: "User profile updated successfully", updatedUser });
  }),
};

module.exports = usersController;
