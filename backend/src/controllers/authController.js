import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "10d" 
    });
};

const signup = async (req, res) => {
    try {
        const { username, password } = req.body;

        userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const newUser = new User({username, password});
        await newUser.save();
        
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            token: generateToken(newUser._id),
        });

    } catch (error) {
        res.status(500).json({ message: "Error creating user" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (user && isMatch) {
            return res.status(200).json({
                _id: user._id,
                username: user.username,
                token: generateToken(user._id),
            });
        } else {
            return res.status(400).json({ message: "Invalid username or password" });
        }

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
