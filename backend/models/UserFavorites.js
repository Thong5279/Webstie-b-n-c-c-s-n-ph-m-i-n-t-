const mongoose = require("mongoose");
const Product = require("./productModel");

const userFavoritesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    favoriteProducts: [
      { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserFavorites", userFavoritesSchema);
