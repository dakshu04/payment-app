// backend/routes/user.js
const express = require("express");
const zod = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const router = express.Router();
//signup and signin routes
const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    password: zod.string(),
})


router.post("/signup", async (req, res) => {
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: body.username
    })

    if(user._id){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const dbUser = await User.create(body);
    const token = jwt.sign({
        userId: dbUser._id
    },JWT_SECRET);

    res.json({
        message:"User created successfully",
        token:token
    })
})


router.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    // Assuming you have a User model with a field 'password' that stores hashed passwords
    const user = await User.findOne({ username: username });

    if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    // If the username and password are valid, create a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.json({
        message: "Login successful",
        token: token
    });
});


module.exports = router;