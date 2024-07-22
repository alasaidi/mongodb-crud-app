import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import productRouter from "./routes/product.route.js";
import userRouter from "./routes/user.route.js";

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

app.use("/products", productRouter);
app.use("/users", userRouter);

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
