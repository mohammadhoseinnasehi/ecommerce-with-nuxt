const router = require("express").Router();
const Owner = require("../models/owner");

// POST request - create a new owner

router.post("/owners", async (req, res) => {
  try {
    console.log("Request Body ", req.body);
    let owner = new Owner();
    owner.name = req.body.name;
    owner.about = req.body.about;
    await owner.save();

    res.json({
      success: true,
      message: "Successfully created a new owner",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET request - get all owners

router.get("/owners", async (req, res) => {
  try {
    let owners = await Owner.find();

    res.json({
      success: true,
      owners: owners,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET request - get a single owner

router.get("/owners/:id", async (req, res) => {
  try {
    let owner = await Owner.findOne({ _id: req.params.id });

    res.json({
      success: true,
      owner: owner,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT request - update a single owner

router.put("/owners/:id", async (req, res) => {
  try {
    let owner = await Owner.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          about: req.body.about,
        },
      },
      { upsert: true }
    );

    res.json({
      success: true,
      message: "Successfully updated a owner",
      updatedOwner: owner, // now we cant see updated owner and see old version
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE request - delete a single owner

router.delete("/owners/:id", async (req, res) => {
  try {
    let deletedOwner = await Owner.findOneAndDelete({ _id: req.params.id });
    if (deletedOwner) {
      res.json({
        success: true,
        message: "Successfully deleted a owner",
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
