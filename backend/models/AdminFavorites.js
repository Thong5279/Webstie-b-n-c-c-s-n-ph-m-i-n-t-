// models/AdminFavorites.js

const mongoose = require("mongoose");

const adminFavoritesSchema = new mongoose.Schema({
  favoriteProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const AdminFavorites = mongoose.model("AdminFavorites", adminFavoritesSchema);

module.exports = AdminFavorites;
