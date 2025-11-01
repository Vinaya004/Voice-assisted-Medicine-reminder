// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const router = express.Router();

// // JWT Secret
// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// // 📝 REGISTER ROUTE
// router.post("/register", async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         let user = await User.findOne({ email });
//         if (user) return res.status(400).json({ message: "User already exists" });

//         const hashedPassword = await bcrypt.hash(password, 10);

//         user = new User({ name, email, password: hashedPassword });
//         await user.save();

//         const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

//         res.status(201).json({ message: "User registered", token, user });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// });

// // 📝 LOGIN ROUTE
// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: "Invalid email or password" });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

//         const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

//         res.status(200).json({ message: "Login successful", token, user });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// });

// module.exports = router;
