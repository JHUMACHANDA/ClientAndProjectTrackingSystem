import User from "../Models/User.js";
import generateToken from "../utils/generateToken.js";

// ── REGISTER (ইউজার রেজিস্ট্রেশন) ──────────────────────────────
export const register = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;

        if (!fullName || !username || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "All fields are required!" 
            });
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ 
            $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }] 
        });

        if (existingUser) {
            const field = existingUser.email === email.toLowerCase() ? "Email" : "Username";
            return res.status(400).json({ 
                success: false, 
                message: `${field} already registered.` 
            });
        }

        const newUser = new User({ 
            fullName, 
            username: username.toLowerCase(), 
            email: email.toLowerCase(), 
            password 
        });
        
        await newUser.save();

        res.status(201).json({ 
            success: true, 
            message: "Registration successful! ✅" 
        });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ success: false, message: "Server error during registration" });
    }
};

// ── LOGIN (ইউজার লগইন) ─────────────────────────────────────────
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, message: "Username and password are required" });
        }

        const user = await User.findOne({ username: username.toLowerCase() });
        
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = generateToken(user._id);

        const userData = {
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email
        };

        res.status(200).json({
            success: true,
            message: "Login successful ✅",
            token,
            user: userData
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "Server error during login" });
    }
};