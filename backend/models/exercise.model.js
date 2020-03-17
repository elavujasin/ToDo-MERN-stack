const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  duration: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  userid: { type: String, required: true }
});

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;
