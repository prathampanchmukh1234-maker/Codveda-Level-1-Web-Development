const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ---------- REGISTER ----------
router.get("/register", async (req, res) => {
  try {
    let { username, email, password } = req.query;

    if (!username || !email || !password) {
      return res.send("Missing username, email, or password");
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.send("User already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.send("User registered successfully");
  } catch (error) {
    res.send("Error: " + error.message);
  }
});

// ---------- LOGIN ----------
router.get("/login", async (req, res) => {
  try {
    let { email, password } = req.query;

    if (!email || !password) {
      return res.send("Missing email or password");
    }

    const user = await User.findOne({ email });
    if (!user) return res.send("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send("Invalid credentials");

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.send(`<textarea>${token}</textarea>`);
  } catch (error) {
    res.send("Error: " + error.message);
  }
});

// ---------- GET PROFILE (THIS IS WHAT WAS MISSING) ----------
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    res.json({
      username: user.username,
      email: user.email,
      avatar: user.avatar || ""
    });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching profile" });
  }
});

// ---------- UPDATE PROFILE ----------
router.post("/profile", authMiddleware, async (req, res) => {
  try {
    const { username, avatar } = req.body;

    const user = await User.findById(req.user);

    if (username) user.username = username;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.json({ msg: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error updating profile" });
  }
});

// ---------- DASHBOARD ----------
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ msg: "Welcome to protected route" });
});

module.exports = router;
