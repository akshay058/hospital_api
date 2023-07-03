const Doctor = require("../models/doctor");

const bcrypt = require("bcryptjs"); // For encrypting password....
const jwt = require("jsonwebtoken");

const asyncHandler = require("express-async-handler");

// Generating JWT Token here.......
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// REGISTERATION Of Doctor function....

const registerDoctor = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400);
    throw new Error("Please filled all the fields");
  }

  // check if user exsist...
  const userExsist = await Doctor.findOne({ name });

  if (userExsist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10); // salt Rounds..
  const hashedPassword = await bcrypt.hash(password, salt); // Encrypting by hash method...

  // Create User.....
  const user = await Doctor.create({
    name,
    password: hashedPassword,
  });

  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User");
  }

  return res.status(200).json({ message: "Successfully Registered" });
});

//LOGIN function of Doctor....

const loginDoctor = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  const user = await Doctor.findOne({ name });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  return res.status(200).json({ message: "Successfully Login" });
});

// //
// const profileDoctor = asyncHandler(async (req, res) => {
//   res.status(200).json(req.user);
// });

module.exports = {
  registerDoctor,
  loginDoctor,
  //   profileDoctor,
};
