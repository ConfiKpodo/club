const User = require("../model/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config.js")

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      email,
      role 
    });

    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating user", error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving user", error: error.message });
  }
};

exports.authenticatedUsers = ensureAuthenticated, async (req, res) => {
  try {
    const users = await User.find({email:users.email});
    return res.status(200).json({
      email: users.email,
      username: users.username,
      role:users.role
    });
  } catch (error) {
    return res.status(500).json({ message:error.message });
  }
}; 

function ensureAuthenticated(req, res, next) {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const user = jwt.verify(accessToken, config.accessTokenSecret);
    req.user = {email:user.email}
    next();
  } catch (erro) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
// Login a user

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!email || !password) {
      return res.status(422).json({ message: "fill all input fields" });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate and send JWT token
    const accessToken = jwt.sign({ email: user.email }, config.accessTokenSecret, {
      subject: "access_token",
      expiresIn: "1h",
    });
    return res.status(200).json({
      //id:user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      accessToken: accessToken,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging in user", error: error.message });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  // If password is being updated, hash it
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }

  try {
    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating user", error: error.message });
  }
};

//fetch base on moderator role
exports.moderators = ensureModerators, async  (req, res)=> {
  const {roles} = req.params;
  try {
    const moderators = await User.find({ roles: "moderator"});
    res.status(200).json(moderators);
  } catch (error) {
    res
     .status(500)
     .json({ message: "Error retrieving moderators", error: error.message });
  }
};
function ensureModerators (req,res, next){
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const user = jwt.verify(accessToken, config.accessTokenSecret);
    if(user.role!=='moderator'){
      return res.status(403).json({ message: "Unauthorized to access moderator functionality" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};
