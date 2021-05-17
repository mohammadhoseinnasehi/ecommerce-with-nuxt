const router = require("express").Router();
const Category = require("../models/category");

// POST request - create a new category

router.post("/categories", async (req, res) => {
  try {
    console.log("Request Body ", req.body);
    let category = new Category();
    category.type = req.body.type;
    await category.save();

    res.json({
      success: true,
      message: "Successfully created a new category",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET request - get all categories

router.get("/categories", async (req, res) => {
  try {
    let categories = await Category.find();

    res.json({
      success: true,
      categories: categories,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET request - get a single category

router.get("/categories/:id", async (req, res) => {
  try {
    let category = await Category.findOne({ _id: req.params.id });

    res.json({
      success: true,
      category: category,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT request - update a single category

router.put("/categories/:id", async (req, res) => {
  try {
    let category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          type: req.body.type,
        },
      },
      { upsert: true }
    );

    res.json({
      success: true,
      message: "Successfully updated a category",
      updatedCategory: category, // now we cant see updated category and see old version
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE request - delete a single category

router.delete("/categories/:id", async (req, res) => {
  try {
    let deletedCategory = await Category.findOneAndDelete({
      _id: req.params.id,
    });
    if (deletedCategory) {
      res.json({
        success: true,
        message: "Successfully deleted a category",
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
