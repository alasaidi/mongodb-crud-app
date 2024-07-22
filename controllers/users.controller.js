import user from "../models/users.model.js";
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
};
export default userController;
