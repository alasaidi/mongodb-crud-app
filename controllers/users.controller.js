import user from "../models/users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import hashPassword from "../utils/hashPassword.js";

//post product
const userController = {
  Register: async (req, res) => {
    try {
      const { name, email, password, address } = req.body;

      // Check if user already exists
      const existingUser = await user.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }
      const hashedPassword = await hashPassword(password);

      const users = await user.create({ name, email, password: hashedPassword, address });
      res.status(200).json({ message: "User has been created successfully", user: users });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      // Find user
      const users = await user.findOne({ email }).select("+password");

      if (!users) {
        return res.status(401).json({ message: "no user found" });
      }
      console.log(users);

      // Check password

      const isMatch = await bcrypt.compare(password, users.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate JWT
      const token = jwt.sign({ id: user.id }, process.env.TOKEN_ACCESS_SECRET, { expiresIn: "1h" });

      // Set cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000, // 1 hour
      });

      res.json({ message: "Login successful", userId: user.id });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("token");
      res.json({ message: "Logout successful" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
export default userController;
