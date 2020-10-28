const mongoose = require("mongoose");

const OwnerSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  properties: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("owner", OwnerSchema);
