import product from "../models/product.model.js";

//post product
const productController = {
  postProducts: async (req, res) => {
    try {
      const products = await product.create(req.body);

      res.status(200).json(products);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  deleteProducts: async (req, res) => {
    try {
      const { name } = req.body;
      console.log(name);
      const result = await product.deleteOne({ name: name });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  updateProducts: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await product.findByIdAndUpdate(id, req.body);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  // update just the name by the id
  updateNameById: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const result = await product.updateOne({ _id: id }, { $set: { name: name } });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  // get all products
  selectAllProducts: async (req, res) => {
    try {
      const products = await product.find({});

      res.status(200).json(products);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  // get products by id
  selectProductById: async (req, res) => {
    try {
      const products = await product.find({ _id: req.params.id });

      res.status(200).json(products);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // get products where the quantity grater then 60
  //   app.get("/api/products", async (req, res) => {
  //     try {
  //       const products = await product.find({ quantity: { $gte: 60 } });

  //       res.status(200).json(products);
  //     } catch (err) {
  //       res.status(500).send(err.message);
  //     }
  //   });
};
export default productController;
