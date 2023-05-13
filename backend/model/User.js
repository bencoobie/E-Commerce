const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  wishList: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  basket: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  orders: [
    {
      _id: { type: mongoose.Types.ObjectId, ref: "Product" },
      status: {
        type: String,
        enum: ["Preparing", "On the way", "Arrived"],
        default: "Preparing",
      },
      comment: { type: String },
      rating: { type: Number },
    },
  ],
  notifications: [{ type: String }],
});

module.exports = mongoose.model("User", userSchema);
