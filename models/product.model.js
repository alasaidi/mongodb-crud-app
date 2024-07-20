import mongoose, { model } from "mongoose";
const ProductSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "please entre product name"] },
    quantity: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const product = mongoose.model("Product", ProductSchema);

export default product;
