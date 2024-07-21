import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import product from "./models/product.model.js";

const port = process.env.PORT;
const username = process.env.USER_NAME;
const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY;

const app = express();

// using express.son middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

//post product
app.post("/api", async (req, res) => {
  try {
    const products = await product.create(req.body);

    res.status(200).json(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete("/api", async (req, res) => {
  try {
    const name = req.body;
    console.log(name);
    const product = await product.delete({ name: name });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/api", async (req, res) => {
  try {
    // const products = await product.find({ quantity: { $gte: 60 } });
    const products = await product.find();

    res.status(200).json(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// mongodb cnx setup
mongoose
  .connect(`mongodb+srv://${username}:${apiKey}@${dbUrl}`)
  .then(() => {
    console.log("db connected");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
