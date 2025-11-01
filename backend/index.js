// // const express = require("express");
// // const multer = require("multer");
// // const cors = require("cors");
// // const path = require("path");
// // const { spawn } = require("child_process");

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // // Multer Storage Configuration
// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null, "uploads/"); // Save files in 'uploads/' directory
// //     },
// //     filename: (req, file, cb) => {
// //         cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
// //     },
// // });

// // const upload = multer({ storage: storage });

// // // Upload Route & Python Processing
// // app.post("/upload", upload.single("file"), (req, res) => {
// //     if (!req.file) {
// //         return res.status(400).json({ error: "No file uploaded" });
// //     }
    
// //     const filePath = path.join(__dirname, "uploads", req.file.filename);

// //     // Call Python script
// //     const pythonProcess = spawn("python3", ["process_image.py", filePath]);

// //     let pythonOutput = "";
// //     pythonProcess.stdout.on("data", (data) => {
// //         pythonOutput += data.toString();
// //     });

// //     pythonProcess.stderr.on("data", (data) => {
// //         console.error(`Python Error: ${data}`);
// //     });

// //     pythonProcess.on("close", (code) => {
// //         if (code !== 0) {
// //             return res.status(500).json({ error: "Python script failed" });
// //         }
// //         res.status(200).json({ message: "File processed", output: pythonOutput });
// //     });
// // });

// // // Serve uploaded files statically
// // app.use("/uploads", express.static("uploads"));

// // // Start Server
// // const PORT = 5000;
// // app.listen(PORT, () => {
// //     console.log(`Server running on http://localhost:${PORT}`);
// // });


// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const cors = require("cors");
// const path = require("path");
// const fs = require("fs");
// const { spawn } = require("child_process");

// // Initialize Express
// const app = express();
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.error("❌ MongoDB Connection Error:", err));

// // User Model
// const User = mongoose.model("User", new mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
// }));

// // JWT Middleware
// const authenticateToken = (req, res, next) => {
//     const token = req.header("Authorization");
//     if (!token) return res.status(401).json({ error: "Access Denied. No Token Provided." });

//     jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET, (err, user) => {
//         if (err) return res.status(403).json({ error: "Invalid Token" });
//         req.user = user;
//         next();
//     });
// };

// // Multer Storage Configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadDir = "uploads/";
//         if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}${path.extname(file.originalname)}`);
//     },
// });

// const upload = multer({ storage });

// // User Registration Route
// app.post("/register", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) return res.status(400).json({ error: "User already exists" });

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ email, password: hashedPassword });
//         await newUser.save();

//         res.status(201).json({ message: "User registered successfully" });
//     } catch (error) {
//         res.status(500).json({ error: "Registration failed" });
//     }
// });

// // User Login Route
// app.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ message: "Invalid email or password" });
//         }

//         // Compare hashed password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: "Invalid email or password" });
//         }

//         // Generate JWT Token
//         const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
//             expiresIn: "1h",
//         });

//         res.status(200).json({ message: "Login successful", token });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// });


// // Upload Route (Requires Authentication)
// app.post("/upload", authenticateToken, upload.single("file"), (req, res) => {
//     if (!req.file) return res.status(400).json({ error: "No file uploaded" });

//     const filePath = path.join(__dirname, "uploads", req.file.filename);

//     // Call Python script
//     const pythonProcess = spawn("python3", ["process_image.py", filePath]);

//     let pythonOutput = "";
//     pythonProcess.stdout.on("data", (data) => {
//         pythonOutput += data.toString();
//     });

//     pythonProcess.stderr.on("data", (data) => {
//         console.error(`Python Error: ${data}`);
//     });

//     pythonProcess.on("close", (code) => {
//         if (code !== 0) return res.status(500).json({ error: "Python script failed" });

//         res.status(200).json({ message: "File processed", output: pythonOutput });
//     });
// });

// // Serve uploaded files statically
// app.use("/uploads", express.static("uploads"));

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
// });


require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());
const smsRoutes = require('./routes/smsRoutes');
app.use('/api/sms', smsRoutes);
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// User Model
const User = mongoose.model("User", new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}));

// JWT Middleware
const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access Denied. No Token Provided." });

    jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid Token" });
        req.user = user;
        next();
    });
};

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = "uploads/";
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage });

// 🟢 User Registration Route
app.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Registration failed", details: error.message });
    }
});

// 🟢 User Login Route (Includes Debugging Logs)
app.post("/login", async (req, res) => {
    console.log("Request Body:", req.body); // Debugging log
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        console.log("User from DB:", user); // Debugging log

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match:", isMatch); // Debugging log

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error", error });
    }
});


// 🟢 Upload Route (Requires Authentication)
app.post("/upload", authenticateToken, upload.single("file"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = path.join(__dirname, "uploads", req.file.filename);

    // Call Python script
    const pythonProcess = spawn("python3", ["process_image.py", filePath]);

    let pythonOutput = "";
    pythonProcess.stdout.on("data", (data) => {
        pythonOutput += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error(`Python Error: ${data}`);
    });

    pythonProcess.on("close", (code) => {
        if (code !== 0) return res.status(500).json({ error: "Python script failed" });

        res.status(200).json({ message: "File processed", output: pythonOutput });
    });
});

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
