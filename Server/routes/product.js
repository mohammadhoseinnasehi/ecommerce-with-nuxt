const router = require("express").Router();
const Product = require("../models/product");
const upload = require("../middlewares/upload-photo");
const cloudinary = require("../middlewares/cloudinary");

// POST request - create a new product

router.post("/products", upload.single("photo"), async (req, res) => {
  try {
    console.log("Request Body ", req.body);
    console.log("Request File ", req.file);
    let result = await cloudinary.uploader.upload(req.file.path); // in this line we use cloudinary
    console.log("Result ", result);
    let product = new Product();
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = result.secure_url;
    product.category = req.body.categoryID;
    product.owner = req.body.ownerID;
    product.stockQuantity = req.body.stockQuantity;
    await product.save();
    res.json({
      success: true,
      message: "Successfully created a new product",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET request - get all products

router.get("/products", async (req, res) => {
  try {
    let products = await Product.find();

    res.json({
      success: true,
      products: products,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET request - get a single product

router.get("/products/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });

    res.json({
      success: true,
      product: product,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT request - update a single product (must fill all fields)

router.put("/products/:id", upload.single("photo"), async (req, res) => {
  try {
    let result = await cloudinary.uploader.upload(req.file.path); // in this line we use cloudinary
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          category: req.body.categoryID,
          photo: result.secure_url,
          description: req.body.description,
          owner: req.body.ownerID,
        },
      },
      { upsert: true }
    );

    res.json({
      success: true,
      message: "Successfully updated a product",
      updatedProduct: product, // now we cant see updated product and see old version
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE request - delete a single product

router.delete("/products/:id", async (req, res) => {
  try {
    let deletedProduct = await Product.findOneAndDelete({ _id: req.params.id });
    if (deletedProduct) {
      res.json({
        success: true,
        message: "Successfully deleted a product",
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
