const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number },
  total: { type: Number },
  owners: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Product", productSchema);
