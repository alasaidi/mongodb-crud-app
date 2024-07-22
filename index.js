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
    const { name } = req.body;
    console.log(name);
    const result = await product.deleteOne({ name: name });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await product.findByIdAndUpdate(id, req.body);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// update just the name by the id
app.put("/api/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const result = await product.updateOne({ _id: id }, { $set: { name: name } });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// get all products
app.get("/api/", async (req, res) => {
  try {
    const products = await product.find({});

    res.status(200).json(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// get products by id
app.get("/api/:id", async (req, res) => {
  try {
    const products = await product.find({ _id: req.params.id });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// get products where the quantity grater then 60
app.get("/api/products", async (req, res) => {
  try {
    const products = await product.find({ quantity: { $gte: 60 } });

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
