const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  filename: String,
  classification: String,
  data: Buffer,
});

module.exports = mongoose.model("Image", ImageSchema);
