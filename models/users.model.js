import mongoose, { model } from "mongoose";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter user name"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [8, "Password should be at least 8 characters long"],
      select: false,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);
const user = mongoose.model("user", userSchema);

export default user;
